use tauri::{AppHandle, Manager};
use tauri_plugin_status_bar_color::SetColorRequest;
use tauri_plugin_status_bar_color::StatusBarColorExt;

#[tauri::command]
fn safe_area_color(name: &str, app_handle: AppHandle) -> String {
    // Get the app_handle directly from the function
    let sbc = app_handle.status_bar_color();
    let _ = sbc.set_color(SetColorRequest {
        hex: String::from(name), // Set color based on `name` (hex color string)
    });

    String::from("here")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_status_bar_color::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![safe_area_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // let app_handle = app.app_handle();  // Getting the app_handle
    //app.run(|_app_handle, _event| {  // Running the app
    // Any app-specific logic can go here
    //});
}
