"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent, useRef } from "react";

export function Auth(): JSX.Element {
    const session = useSession();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const res = await signIn("credentials",
            { email, password, redirect: false }
        );

        console.log({ res });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" id="email" placeholder="Email" ref={emailRef} />
                <input type="password" name="password" id="password" placeholder="Password" ref={passwordRef} />
                <button type="submit">submit</button>
            </form>
            {JSON.stringify(session)}
            <button onClick={() => signOut()}>sign out</button>
        </div>
    );
}