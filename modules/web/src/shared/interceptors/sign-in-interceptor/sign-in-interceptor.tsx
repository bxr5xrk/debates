"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignInByCredentialsForm } from "@/features/auth";
import { useClickKey, useClickOutside } from "@/shared/hooks";
import { useRef } from "react";
import { Button } from "@/shared/ui";

export function SignInInterceptor(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const { back } = useRouter();
    useClickOutside(() =>  back(), ref);
    useClickKey(["Escape"], () =>  back(), false);

    return (
        <>
            <div className="absolute inset-0 bg-zinc-900/30" />
            <div ref={ref} className='container flex items-center h-full max-w-lg mx-auto'>
                <div className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'>
                    <div className='absolute top-4 right-4'>
                        <Button className='rounded-md' onClick={() => back()}>
                            <Image src="/icons/x.svg" width={16} height={16} alt="Close" />
                        </Button>
                    </div>

                    <SignInByCredentialsForm onSuccess={() =>  back()} />
                </div>
            </div>
        </>
    );
}