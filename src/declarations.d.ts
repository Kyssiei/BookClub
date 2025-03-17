declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare namespace NodeJS {
    interface ProcessEnv{
        REACT_APP_API_KEY: string;
    }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}