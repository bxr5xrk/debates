import Image from "next/image";

interface ProfilePhotoProps {
    setProfilePhoto: React.Dispatch<React.SetStateAction<File | null>>;
}

export function ProfilePhoto({ setProfilePhoto }: ProfilePhotoProps): JSX.Element {
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
                    e.target.files
                        ? setProfilePhoto(e.target.files[0])
                        : setProfilePhoto(null);
                }}
            />
        </div>
    );
}
