/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@app/store" {
  export class Store {
    constructor(filename: string);

    set(key: string, value: unknown): Promise<void>;
    get(key: string): Promise<unknown>;
    save(): Promise<void>;
  }
}

declare module 'process';