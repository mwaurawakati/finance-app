import { load, Store } from "@tauri-apps/plugin-store";
//const { createStore } = window.__TAURI__.store;
import { isTauri } from "@tauri-apps/api/core";
let store: Store;
(async () => {
  if (isTauri()) {
    store = await load("store.bin", { autoSave: false });
  }
})();

export async function set(key: string, value: string) {
  if (isTauri()) {
    await store.set(key, value);
    await store.save();
  } else {
    window.localStorage.setItem(key, value);
  }
}
export async function get(key: string) {
  if (isTauri()) {
    const val = await store.get(key);
    return val;
  } else {
    return window.localStorage.getItem(key);
  }
}

export async function deleteKey(key: string) {
  if (isTauri()) {
    await store.delete(key);
    await store.save();
  } else {
    window.localStorage.removeItem(key);
  }
}
