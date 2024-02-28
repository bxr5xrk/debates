import Image from "next/image";
import { onUpload } from "@/shared/lib";

interface ProfilePhotoProps {
    profilePhoto: File | string | null;
    setProfilePhoto: (photo: File) => void;
}

const profilePhotoUrl = (profilePhoto: File | string | null): string => {
    if (profilePhoto instanceof File) {
        return URL.createObjectURL(profilePhoto);
    } else if (typeof profilePhoto === "string") {
        return profilePhoto;
    }

    return `/sign-up-page/profile-photo.svg`;
};

export function ProfilePhoto({
    profilePhoto,
    setProfilePhoto,
}: ProfilePhotoProps): JSX.Element {
    return (
        <div>
            <label
                className="flex rounded-full justify-center cursor-pointer items-center w-full"
                htmlFor="image"
            >
                <span className="w-48 h-48 z-15 group block relative w-3/5 border-4 border-slate-700 rounded-full bg-slate-700 ease-in-out duration-300 overflow-hidden sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                    <span className="z-20 block absolute top-0 left-0 w-full h-full rounded-full text-transparent text-center font-bold text-2xl uppercase ease-in-out duration-300 flex items-center justify-center hover:bg-slate-700 hover:text-white">
                        {profilePhoto ? "Change photo" : "Add photo"}
                    </span>

                    <Image
                        className="w-full h-full object-cover"
                        src={profilePhotoUrl(profilePhoto)}
                        alt="profile-photo"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={true}
                    />
                </span>
            </label>
            <input
                className="hidden"
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => onUpload(e, setProfilePhoto)}
            />
        </div>
    );
}
