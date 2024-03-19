import { User } from "@/entities/user";
import { cl } from "@/shared/lib/cl";
import { RoomUserItem } from "../room-user-item";

interface RoomTeamListProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    team: User[];
    currentUserId: number;
    css?:string;
}

export function RoomTeamList(props: RoomTeamListProps): JSX.Element {
    const { team, className, currentUserId, ...meta} = props;
    
    return (
        <div
            className={cl(
                "top-0 z-[0] gap-5 p-2 flex flex-col justify-center h-screen max-h-full",
                className
            )}
            {...meta}

        >
            {team.map((member) => (
            
                <RoomUserItem
                    key={member.id}
                    {...member}
                    isCurrentUser={member.id === currentUserId}
                />
            ))}
        </div>
    );
}
