import { defineStore } from "pinia";
import { set } from "../app/store";
import { invoke, isTauri } from "@tauri-apps/api/core";
export const useAppearanceStore = defineStore("appearance", {
  state: () => ({
    theme: "system" as "system" | "dark" | "light",
  }),
  actions: {
    changeTheme(theme: "system" | "dark" | "light") {
      set("theme", theme);
      const statusBarMetaTag = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      );
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );
      const htmlElement = document.documentElement;
      const bodyElement = document.body;

      if (theme === "system") {
        this.theme = "system";
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          htmlElement.classList.add("dark");
          bodyElement.style.backgroundColor = "#000000"; // Dark background
          htmlElement.style.backgroundColor = "#000000"; // Dark background

          if (statusBarMetaTag)
            statusBarMetaTag.setAttribute("content", "#000000");
          if (themeColorMetaTag)
            themeColorMetaTag.setAttribute("content", "#000000");
          if (isTauri()) invoke("safe_area_color", { name: "#000000" });
        } else {
          htmlElement.classList.remove("dark");
          bodyElement.style.backgroundColor = "#ffffff"; // Light background
          htmlElement.style.backgroundColor = "#ffffff"; // Light background

          if (statusBarMetaTag)
            statusBarMetaTag.setAttribute("content", "default");
          if (themeColorMetaTag)
            themeColorMetaTag.setAttribute("content", "#ffffff");
          if (isTauri()) invoke("safe_area_color", { name: "#FEFEFE" });
        }
      } else if (theme === "dark") {
        this.theme = "dark";
        htmlElement.classList.add("dark");
        bodyElement.style.backgroundColor = "#000000"; // Dark background
        htmlElement.style.backgroundColor = "#000000"; // Dark background

        if (statusBarMetaTag)
          statusBarMetaTag.setAttribute("content", "#000000");
        if (themeColorMetaTag)
          themeColorMetaTag.setAttribute("content", "#000000");
        if (isTauri()) invoke("safe_area_color", { name: "#000000" });
      } else {
        this.theme = "light";
        htmlElement.classList.remove("dark");
        bodyElement.style.backgroundColor = "#ffffff"; // Light background
        htmlElement.style.backgroundColor = "#ffffff"; // Light background

        if (statusBarMetaTag)
          statusBarMetaTag.setAttribute("content", "default");
        if (themeColorMetaTag)
          themeColorMetaTag.setAttribute("content", "#ffffff");
        if (isTauri()) invoke("safe_area_color", { name: "#FEFEFE" });
      }
    },
  },
});

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    pushEnabled: false,
    smsEnabled: false,
    orderUpdatesEnabled: false,
    ratingReminders: false,
    marketing: false,
    support: false,
  }),
  actions: {
    enablePush(enabled?: boolean) {
      if (typeof enabled !== "undefined") {
        set("pushEnabled", enabled.toString());
        this.pushEnabled = enabled;
      } else {
        set("pushEnabled", this.pushEnabled.toString());
      }
    },
  },
});
