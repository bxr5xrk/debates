import React from "react";

import { Text } from "@/shared/ui";
import Link from "next/link";

type BaseButtonProps = {
  text: string;
  className?: string[];
  width: string;
  height: string;
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
  height,
  width,
  font,
  fontSize,
  className,
  Tag,
  href,
}: buttonProps) {
  const commonStyles: string[] = [
    "flex",
    width,
    height,
    // "bg-red-500",
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
  ];

  const classes = [...commonStyles, ...(className || [])].join(" ");

  if (Tag === "Link") {
    return (
      <Link href={href} className={classes}>
        <Text Teg="p" textInTag={text} className={textStyles} />
      </Link>
    );
  } else {
    return React.createElement(
      Tag,
      { className: classes },
      <Text Teg="p" textInTag={text} className={textStyles} />
    );
  }
}
