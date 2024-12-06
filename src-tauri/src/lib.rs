#[cfg(desktop)]
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
};
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
        .setup(move |app| {
            #[cfg(desktop)]
            {
                let hide_app = MenuItem::with_id(app, "hide_app", "Hide", true, None::<&str>)?;
                let show_app = MenuItem::with_id(app, "show_app", "Show", true, None::<&str>)?;
                let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
                let menu = Menu::with_items(app, &[&hide_app, &show_app,&quit])?;
                let _ = TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu(&menu)
                    //.menu_on_left_click(true)
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "hide_app" => {
                            println!("quit menu item was clicked");
                            app.get_window("pake").unwrap().minimize().unwrap();
                        }
                        "show_app" => {
                            app.get_window("pake").unwrap().show().unwrap();
                        }
                        "quit" => {
                            //let _res = app.save_window_state(StateFlags::all());
                            std::process::exit(0);
                        }
                        _ => {}
                    })
                    .on_tray_icon_event(|tray, event| match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            println!("left click pressed and released");
                            // in this example, let's show and focus the main window when the tray is clicked
                            let app = tray.app_handle();
                            if let Some(window) = app.get_webview_window("pake") {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                        _ => {
                            println!("unhandled event {event:?}");
                        }
                    })
                    .build(app)?;
            }
            //Ok(())
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    // let app_handle = app.app_handle();  // Getting the app_handle
    //app.run(|_app_handle, _event| {  // Running the app
    // Any app-specific logic can go here
    //});
}
