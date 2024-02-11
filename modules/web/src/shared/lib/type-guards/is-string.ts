export function isString(value?: string | string[] | null | unknown): value is string {
    return typeof value === "string";
}
