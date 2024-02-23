import React from "react";
import { cl } from "../../lib/cl";

interface TextProps
    extends React.HTMLAttributes<
        HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement
    > {
    Tag: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    classes: string[];
}

export function Text(props: TextProps): JSX.Element {
    const { children, Tag, classes, ...meta } = props;
    const classesStr = cl(...classes);

    return (
        <Tag className={classesStr} {...meta}>
            {children}
        </Tag>
    );
}
