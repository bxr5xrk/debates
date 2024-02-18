import React from "react";

type textProps = {
    Teg: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    textInTag: string;
    className?: string[];
};

export default function Text({
    Teg,
    textInTag,
    className,
}: textProps): JSX.Element {
    const classes = [...(className || [])];

    return React.createElement(
        Teg,
        { className: classes.join(" ") },
        textInTag
    );
}
