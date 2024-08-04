use std::fs;
use ts_rs::TS;

#[derive(TS, serde::Serialize)]
#[serde(tag = "type")]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub enum FileTreeNode {
    Directory {
        path: String,
        children: Vec<FileTreeNode>,
    },
    File {
        path: String,
    },
}

#[tauri::command]
pub fn crawl_dir(path: &str) -> Result<FileTreeNode, String> {
    let dir = fs::read_dir(path).map_err(|_| String::from(format!("read_dir failed: {path}")))?;

    let mut files: Vec<FileTreeNode> = vec![];

    dir.filter_map(|item| item.ok()).for_each(|dir_entry| {
        if let Ok(file_type) = dir_entry.file_type() {
            if file_type.is_file() {
                if let Ok(path) = dir_entry.path().into_os_string().into_string() {
                    files.push(FileTreeNode::File { path })
                }
            } else if file_type.is_dir() {
                if let Ok(path) = dir_entry.path().into_os_string().into_string() {
                    if let Ok(node) = crawl_dir(&path) {
                        files.push(node);
                    }
                }
            }
        }
    });

    Ok(FileTreeNode::Directory {
        path: path.to_string(),
        children: files,
    })
}
