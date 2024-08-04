// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod dir_crawler;
mod file_loader;
mod file_writer;

use dir_crawler::crawl_dir;
use file_loader::load_file;
use file_writer::write_file;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![crawl_dir, load_file, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
