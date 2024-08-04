use std::fs;

#[tauri::command]
pub fn load_file(path: &str) -> Result<String, String> {
    let file = fs::read_to_string(path)
        .map_err(|_| String::from(format!("read_to_string failed: {path}")))?;
    Ok(file)
}
