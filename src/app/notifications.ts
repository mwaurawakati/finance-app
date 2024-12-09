import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
    Options,
  } from "@tauri-apps/plugin-notification";
  import { isTauri } from "@tauri-apps/api/core";
  
  // Re-export the Options type
  export type { Options };
  
  export async function sendNotificationPanda(options: Options) {
    if (isTauri()) {
      const permissionGranted = await isPermissionGranted();
      if (permissionGranted) {
        await sendNotification(options);
      }
    } else {
      if ("Notification" in window) {
        const permission = Notification.permission;
        if (permission === "granted") {
          new Notification(options.title, {
            body: options.body,
            tag: "message",
          });
        }
      }
    }
  }
  
  export async function isGranted() {
    if (isTauri()) {
      return await isPermissionGranted();
    } else {
      if ("Notification" in window) {
        return Notification.permission == "granted";
      } else {
        return false;
      }
    }
  }
  
  export async function askPermission() {
    if (isTauri()) {
      let permissionGranted = await isPermissionGranted();
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
      }
      return permissionGranted;
    } else {
      if ("Notification" in window) {
        const permission = Notification.permission;
  
        if (permission !== "granted") {
          await Notification.requestPermission();
        }
      }
    }
  }