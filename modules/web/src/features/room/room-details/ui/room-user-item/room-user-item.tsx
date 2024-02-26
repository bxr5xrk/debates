import { cl } from "@/shared/lib/cl";

interface RoomUserItemProps {
  nickname: string;
  email: string;
  isCurrentUser?: boolean;
}

export function RoomUserItem(props: RoomUserItemProps): JSX.Element {
    const { nickname, email, isCurrentUser } = props;

    return (
        <div className={cl("border rounded-xl p-2", isCurrentUser && "bg-green-100")}>
            <p>{nickname}</p>
            <p>{email}</p>
        </div>
    );
}