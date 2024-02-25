import { User } from "@/entities/user";
import { cl } from "@/shared/lib/cl";
import { RoomUserItem } from "../room-user-item";

interface RoomTeamListProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    team: User[];
    currentUserId: number;
}

export function RoomTeamList(props: RoomTeamListProps): JSX.Element {
    const { team, className, currentUserId, ...meta } = props;

    return (
        <div className={cl("border rounded-xl p-2 flex flex-col gap-2", className)} {...meta}>
            {team.map((member) => (
                <RoomUserItem key={member.id} {...member} isCurrentUser={member.id === currentUserId} />
            ))}
        </div>
    );
}