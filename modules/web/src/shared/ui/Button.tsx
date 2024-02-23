import React from "react";

import { Text } from "@/shared/ui";
import { cl } from "../lib/cl";
import buttonProps from "./types";

export default function Button({
    text,
    width,
    font,
    fontSize,
    className,
    Tag,
    ...meta
}: buttonProps): JSX.Element {
    const commonStyles: string[] = [
        "flex",
        width,
        "p-4",
        "border-4",
        "border-black",
        "rounded-3xl",
        "transition",
        "duration-1000",
        "hover:bg-blackLight",
        "hover:border-white",
        "hover:text-white",
    ];

    const textStyles: string[] = [
        "flex justify-center items-center",
        fontSize,
        font,
        width,
        "vertical-middle",
        "text-center",
        "h-full",
        "whitespace-nowrap",
    ];

    const classes = cl(...commonStyles, ...(className || []));

    return (
        <Tag className={classes} {...meta}>
            <Text Tag="p" classes={textStyles}>
                {text}
            </Text>
        </Tag>
    );
}
