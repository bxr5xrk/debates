import Image from "next/image";

interface ProfilePhotoProps {
    // setProfilePhoto: React.Dispatch<React.SetStateAction<File | null>>;
    profilePhoto: File | null;
    checkProfilePhoto: (profilePhoto: File) => void;
    profilePhotoVerified: boolean;
}

export function ProfilePhoto({
    profilePhoto,
    checkProfilePhoto,
    profilePhotoVerified
}: ProfilePhotoProps): JSX.Element {
    return (
        <div className="lg:mt-24 lg:mr-24">
            <label
                className="flex rounded-full justify-center cursor-pointer items-center w-full"
                htmlFor="image"
            >
                <span className="group block relative w-3/5 rounded-full border-4 border-slate-700 hover:bg-slate-700 ease-in-out duration-300 overflow-hidden lg:w-64">
                    <span className="z-20 block absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-transparent text-center font-bold text-2xl uppercase ease-in-out duration-300 group-hover:text-white">
                        Add photo
                    </span>
                    <Image
                        className="object-cover scale-75"
                        // src={profilePhotoVerified ? profilePhoto : `/sign-up-page/profile-photo.svg`}
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
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files) {
                        checkProfilePhoto(e.target.files[0]);
                        console.log(profilePhotoVerified);
                    }
                    console.log("Photo verified: " + profilePhotoVerified);
                }}
            />
        </div>
    );
}
