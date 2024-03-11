import { Room, RoomStatusEnum } from "@/entities/room";
import { formatSeconds } from "@/shared/lib";

interface MainDetailsProps {
    countdownTotal: number;
    countdownReport: number;
    countdownGrading: number;
    room: Room | undefined;
    isAdmin: boolean;
    status: RoomStatusEnum | null;
    currentTeamType: string | undefined | null;
}

export function MainDetails(props: MainDetailsProps): JSX.Element {
    const {
        countdownTotal,
        countdownReport,
        // countdownGrading,
        // room,
        // isAdmin,
        status,
        currentTeamType,
    } = props;

    return (
        <div className="p-4">
            <p className="bg-amber-400 w-max min-w-[250px] text-center font-bold mx-auto text-[50px] rounded-[20px] border border-black border-r-4 border-b-4 px-4 py-2">
                {formatSeconds(countdownTotal)}
            </p>
            {status === "started"
                ? <p className={currentTeamType === "conTeam"?"text-[40px] mx-auto w-max text-red-600 font-bold border-text":"text-[40px] font-bold mx-auto w-max text-sky-600 border-text"}>Report</p>
                : <p className="text-amber-400 font-bold text-[45px] mx-auto w-max border-text">Paused</p>
            }
            {/* <p>countdown report: {formatSeconds(countdownTotal)}</p> */}
            <div className="flex justify-between">
                <div className="flex gap-[30px] items-center">
                    <p className="min-w-[150px] p-2 text-[40px] h-max rounded-[10px] text-center bg-red border border-black border-b-4 border-r-4 flex justify-center items-center">
                        {currentTeamType === "conTeam"
                            ? formatSeconds(countdownReport)
                            : "--:--"}
                    </p>
                    <div className="flex flex-col items-center">
                        <p className="text-[40px] border-text text-red-600 font-bold">Red</p>
                        <p className="text-[30px] font-bold">Team</p>
                        {currentTeamType === "conTeam" && <p className="text-[45px] border-text text-red-600 font-bold">Your turn</p>}
                    </div>
                </div>
                <div className="flex gap-[30px] items-center" >
                    <div className="flex flex-col items-center">
                        <p className="text-[40px] border-text text-sky-600 font-bold">Blue</p>
                        <p className="text-[30px] font-bold">Team</p>
                        {currentTeamType === "proTeam" && <p className="text-[45px] border-text text-sky-600 font-bold">Your turn</p>}
                    </div>
                    <p className="min-w-[150px] h-max p-2 text-[40px] rounded-[10px] text-center bg-blue border border-black border-b-4 border-r-4 flex justify-center items-center">
                        {currentTeamType === "proTeam"
                            ? formatSeconds(countdownReport)
                            : "--:--"}
                    </p>
                </div>
            </div>
        </div>
    );
}
