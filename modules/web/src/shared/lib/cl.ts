export function cl(...classes: Array<string | undefined | number | boolean | null | Record<string, unknown>>): string {
    return classes
        .map(className => {
            if (!className || typeof className === "number" || typeof className === "boolean") {
                return "";
            }

            if (typeof className === "object") {
                return Object.keys(className).filter(k => className[k]).join(" ");
            }

            return className;
        })
        .filter(Boolean)
        .join(" ");
}