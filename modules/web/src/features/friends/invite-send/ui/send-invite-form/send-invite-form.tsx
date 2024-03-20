import { useRef, useState } from "react";
import { API } from "@/shared/api/api-routes";
import { useInviteSend } from "../../api";
import { useAfterFetch } from "@/shared/hooks";
import { useWhoami } from "@/features/auth";
import { Button } from "@/shared/ui";
import { ModalWindow } from "./modalWindow";
import { useInvites } from "@/features/friends/invites-list/api";

export function SendInviteForm(): JSX.Element {
    const { trigger, isMutating } = useInviteSend();
    const nicknameRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const { onAfterFetch } = useAfterFetch({
        revalidate: [API.FRIENDS_ROUTES.sentInvites],});
    const { data: whoami } = useWhoami();
    const [error, setError] = useState<string | null>(null); 
    const [showInvites, setShowInvites] = useState(false);

    


    function handleClickOutsideModal(event: MouseEvent): void {
        if (!modalRef || !modalRef.current?.contains(event.target as Node)) {
            setShowInvites(false);
        }
    }
    window.addEventListener("click", handleClickOutsideModal);    

    const { data } = useInvites();

    console.log(data);

    const invites = data?.data;
    const notlification =invites? invites.length : 0;

    async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        setError("");

        if (!nicknameRef.current) {
            return;
        }

        const nickname = nicknameRef.current.value;

        if (nickname === whoami?.data.nickname) {
            setError("You cannot invite yourself as a friend!");
            nicknameRef.current.value = "";
            return;
        }

        const res = await trigger({ nickname });
        onAfterFetch(["Invite sent successfully", "Failed to send invite"], res.status);
        nicknameRef.current.value = "";
    }

    const showModal = (): void => {
        setShowInvites(!showInvites);
    };
    

    return (
        <form onSubmit={onSubmit} className="w-fullflex p-4 pt-[20px] pb-[30px] h-2xl">
            <div className="flex-col w-full">
                <div className="flex gap-[20px] w-full h-min flex-col md:flex-row">
                    <div className="flex w-[80%] md:w-[60%] gap-[20px]">
                        <input
                            required
                            ref={nicknameRef}
                            type="text"
                            placeholder="nickname Id"
                            className="border-2 grow-5 border-black rounded-[10px] p-[10px] border-r-4 border-b-4 w-full"
                        />
                        <button
                            className="base-button w-full max-w-[140px] flex justify-center text-2xl 
                                transition duration-1000 after:hover:bg-blackLight
                                after:content-[''] after:transition hover:text-white"
                            type="submit"
                            disabled={isMutating}
                        >
                            {isMutating ? "Loading..." : "send"}
                        </button>
                        
                    </div >
                    <div ref={modalRef} className="relative flex flex-col items-center md:w-[35%] w-full">
                        <Button
                            onClick={showModal}
                            className="base-button max-w-[500px] min-w-[281px] w-full flex justify-center text-2xl after:bg-amber-400
                                transition duration-1000 after:hover:bg-amber-500 font-normal
                                after:content-[''] after:transition hover:text-white nowrap relative"
                            type="button"
                        >
                            <p className="static-text">received invitations</p>
                            <div className="absolute  w-[25px] flex justify-center items-center h-[25px] rounded-full bg-red top-[-5px] right-[-5px] text-[14px] p-1">+{notlification}</div>
                        </Button>
                        {showInvites && (
                            <ModalWindow />
                        )}
                    </div>
                </div>
                {error && <p className="text-rose-600 text-1xl">{error}</p>}
            </div>
        </form>
    );
}
