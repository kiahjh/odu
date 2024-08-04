use std::fs;

#[tauri::command]
pub fn write_file(path: &str, contents: &str) -> Result<(), String> {
    fs::write(path, contents).map_err(|_| String::from(format!("write failed: {path}")))?;
    Ok(())
}
