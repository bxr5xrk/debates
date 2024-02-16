import React from "react";

import { Page } from "@/shared/layout/page";
import { Text, Button } from "@/shared/ui";

//svg
import SwordsSVG from "./SwordsSVG";
import Link from "next/link";
// import { Button } from "@/components/ui/button"

export function HomePage(): JSX.Element {
  return (
    <Page className="p-8">
      <Button
        text="Sign Up"
        font="bold"
        paddingX="6"
        paddingY="2"
        fontSize="25"
        Tag="Link"
        href="sign-up"
        className={["ml-auto"]}
      />
      <div className="flex justify-center flex-col gap-6 mt-9 h-5/6">
        <SwordsSVG />
        <Text
          Teg="h1"
          textInTag="DEBATE NIGHT"
          className={["text-9xl", "font-bold", "text-center"]}
        />
        {/* <Link
          href="/sign-in"
          className="border-4 border-black mx-auto mt-11   rounded-3xl px-20 py-4"
        >
          <Text
            Teg="p"
            textInTag="Play"
            className={["text-5xl", "color-E2E8F0", "text-center", "font-bold"]}
          />
        </Link> */}
        <Button
          text="Play"
          font="bold"
          paddingX="20"
          paddingY="4"
          fontSize="5xl"
          Tag="Link"
          href="/sign-in"
          className={["mx-auto", "mt-11"]}
        />
      </div>
    </Page>
  );
}
