import React from "react";

import { Text } from "@/shared/ui";
import Link from "next/link";

type BaseButtonProps = {
  text: string;
  className?: string[];
  paddingY: string;
  paddingX: string;
  font: string;
  fontSize: string;
};

type LinkButtonProps = BaseButtonProps & {
  Tag: "Link";
  href: string;
};

type NonLinkButtonProps = BaseButtonProps & {
  Tag: "button" | "div" | "li";
  href?: never;
};

type buttonProps = LinkButtonProps | NonLinkButtonProps;

export default function Button({
  text,
  paddingY,
  paddingX,
  font,
  fontSize,
  className,
  Tag,
  href,
}: buttonProps) {
  const commonStyles: string[] = [
    "flex",
    "w-max",
    "border-4",
    "border-black",
    "rounded-3xl",
    "transition",
    "duration-1000",
    "hover:bg-blackLight",
    "hover:border-white",
    "hover:text-white",
  ];

  const classes = [...commonStyles, ...(className || [])].join(" ");

  if (Tag === "Link") {
    return (
      <Link href={href} className={classes}>
        <Text
          Teg="span"
          textInTag={text}
          className={[
            `text-${fontSize}`,
            `font-${font}`,
            `py-${paddingY}`,
            `px-${paddingX}`,
          ]}
        />
      </Link>
    );
  } else {
    return React.createElement(
      Tag,
      { className: classes },
      <Text
        Teg="span"
        textInTag={text}
        className={[
          `text-${fontSize}`,
          `font-${font}`,
          `py-${paddingY}`,
          `px-${paddingX}`,
        ]}
      />
    );
  }
}
