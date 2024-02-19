"use client";

import { FormEvent, useRef, useState } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import ProfilePhoto from "./ProfilePhoto";
import RegistrationFormData from "./RegistrationFormData";
import axios from "axios";
import InputData from "./InputData";

export interface RegistrationData {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export function SignUpByCredentialsForm(): JSX.Element {
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        name: "",
        surname: "",
        nickname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    console.log("Prof photo: " + profilePhoto);
    console.table(registrationData);
    // const emailRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);
    // const nameRef = useRef<HTMLInputElement>(null);
    // const nicknameRef = useRef<HTMLInputElement>(null);
    const { trigger } = useSignUp();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/dashboard",
    });

    const isEmailValid = (email: string) => !!email.length;

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        e.stopPropagation();

        // messages will be added instead of console.log
        if (!isEmailValid(registrationData.email)) {
            console.log("email");
            return;
        }

        if (!registrationData.password.trim()) {
            console.log("password missed");
            return;
        }

        if (
            !registrationData.name.trim() &&
            !registrationData.surname.trim() &&
            !registrationData.nickname.trim()
        ) {
            console.log("name");
            return;
        }

        if (
            registrationData.password !== registrationData.passwordConfirmation
        ) {
            console.log("password");
            return;
        }

        // const res = await trigger({ profilePhoto, ...registrationData });

        // onAfterFetch(
        //     ["Signed up successfully", "Failed to sign in"],
        //     res.status
        // );
        axios
            .post("https://httpbin.org/post", registrationData)
            .then((response) => {
                console.log(response.status, response.data);
            });
    }

    return (
        <div>
            <form
                className="flex flex-col justify-center items-center w-full gap-5 lg:flex-row lg:justify-end lg:items-start lg:pt-15"
                onSubmit={onSubmit}
            >
                <ProfilePhoto setProfilePhoto={setProfilePhoto} />
                <RegistrationFormData
                    registrationData={registrationData}
                    setRegistrationData={setRegistrationData}
                />
            </form>
        </div>
    );
}
