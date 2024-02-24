import Image from "next/image";

interface ProfilePhotoProps {
    // setProfilePhoto: React.Dispatch<React.SetStateAction<File | null>>;
    profilePhoto: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // checkProfilePhoto: (profilePhoto: File) => void;
    // profilePhotoVerified: boolean;
}

export function ProfilePhoto({
    profilePhoto,
    onChange,
}: // checkProfilePhoto,
// profilePhotoVerified
ProfilePhotoProps): JSX.Element {
    const imageSource = profilePhoto
        ? URL.createObjectURL(profilePhoto)
        : `/sign-up-page/profile-photo.svg`;
    return (
        <div className="lg:mt-24 lg:mr-24">
            <label
                className="flex rounded-full justify-center cursor-pointer items-center w-full"
                htmlFor="image"
            >
                <span className="w-48 h-48 z-15 group block relative w-3/5 border-4 border-slate-700 rounded-full hover:bg-slate-700 ease-in-out duration-300 overflow-hidden sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                    <span className="z-20 block absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-transparent text-center font-bold text-2xl uppercase ease-in-out duration-300 group-hover:text-white">
                        Add photo
                    </span>

                    <Image
                        className="w-full h-full object-cover"
                        // src={profilePhotoVerified ? profilePhoto : `/sign-up-page/profile-photo.svg`}
                        src={imageSource}
                        alt="profile-photo"
                        fill={true}
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
                onChange={onChange}
                // onChange={(e) => {
                //     if (e.target.files) {
                //         checkProfilePhoto(e.target.files[0]);
                //         console.log(profilePhotoVerified);
                //     }
                //     console.log("Photo verified: " + profilePhotoVerified);
                // }}
            />
        </div>
    );
}
