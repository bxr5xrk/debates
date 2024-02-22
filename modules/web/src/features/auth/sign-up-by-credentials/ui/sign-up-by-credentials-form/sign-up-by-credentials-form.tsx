"use client";

import { FormEvent, useRef, useState } from "react";
import { useSignUp } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { API } from "@/shared/api/api-routes";
import { ProfilePhoto } from "./ProfilePhoto";
import { RegistrationFormData } from "./RegistrationFormData";
import axios from "axios";
import { Arvo } from "next/font/google";

const arvo = Arvo({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export interface RegistrationData {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const isEmailValid = (email: string) => !!email.length;

const checkRegistrationData = (registrationData: RegistrationData): boolean => {
    if (!isEmailValid(registrationData.email)) {
        console.log("email");
        return false;
    }

    if (!registrationData.password.trim()) {
        console.log("password missed");
        return false;
    }

    if (
        !registrationData.name.trim() &&
        !registrationData.surname.trim() &&
        !registrationData.nickname.trim()
    ) {
        console.log("name");
        return false;
    }

    if (registrationData.password !== registrationData.passwordConfirmation) {
        console.log("password");
        return false;
    }

    return true;
};

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
    console.table(registrationData);

    const { trigger } = useSignUp();
    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.AUTH_ROUTES.whoami],
        redirect: "/dashboard",
    });

    async function onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        e.stopPropagation();

        if (!checkRegistrationData(registrationData)) {
            return;
        }

        const res = await trigger({ profilePhoto, ...registrationData });
        onAfterFetch(
            ["Signed up successfully", "Failed to sign in"],
            res.status
        );

        // axios
        //     .post("https://httpbin.org/post", registrationData)
        //     .then((response) => {
        //         console.log(response.status, response.data);
        //         setRegistrationData({...registrationData,
        //             name: "",
        //             surname: "",
        //             nickname: "",
        //             email: "",
        //             password: "",
        //             passwordConfirmation: "",
        //         });
        //     });

    }

    return (
        <div className={arvo.className}>
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
