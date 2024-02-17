"use client";

import { FormEvent, useRef } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import Image from "next/image";

export function SignUpByCredentialsForm(): JSX.Element {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const nicknameRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignUp();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/dashboard",
    });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();

        const email = emailRef.current?.value ?? "";
        const password = passwordRef.current?.value ?? "";
        const name = nameRef.current?.value ?? "";
        const nickname = nicknameRef.current?.value ?? "";

        const res = await trigger({ email, password, name, nickname });

        onAfterFetch(
            ["Signed up successfully", "Failed to sign in"],
            res.status
        );
    }

    return (
        <form className="flex flex-col justify-center items-center w-full gap-5" onSubmit={onSubmit}>
            <div>
                <label className="flex rounded-full justify-center items-center w-full" htmlFor="image">
                    <span className="group block relative w-3/5 cursor-pointer rounded-full border-4 border-slate-700 hover:bg-slate-700 ease-in-out duration-300 overflow-hidden">
                        <span className="z-20 block absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-transparent text-center font-bold text-2xl uppercase ease-in-out duration-300 group-hover:text-white">Add photo</span>
                        <Image
                            className="object-cover scale-75"
                            src={`/sign-up-page/profile-photo.svg`}
                            alt="profile-photo"
                            width="440"
                            height="440"
                            priority
                        />
                    </span>
                </label>
                <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                    required
                    accept="image/*"
                />
            </div>
            <div className="flex flex-col w-full gap-3">
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    id="name"
                    placeholder="Name"
                    ref={nameRef}
                />
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    id="surname"
                    placeholder="Surname"
                    ref={nameRef}
                />
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="text"
                    name="nickname"
                    required
                    minLength={2}
                    id="nickname"
                    placeholder="Nickname"
                    ref={nicknameRef}
                />
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="email"
                    name="email"
                    required
                    id="email"
                    minLength={2}
                    placeholder="Email"
                    ref={emailRef}
                />
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="password"
                    name="password"
                    required
                    minLength={2}
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input
                    className="border rounded-lg border-slate-700 text-lg p-3 sm:text-xl sm:p-4"
                    type="password"
                    name="password"
                    required
                    minLength={2}
                    id="password"
                    placeholder="Repeat the password"
                    ref={passwordRef}
                />
                <button
                    className="bg-slate-700 text-white text-lg w-full mx-auto p-4 rounded-lg font-medium sm:text-xl sm:p-4"
                    type="submit"
                >
                    Create account
                </button>
            </div>
        </form>
    );
}
