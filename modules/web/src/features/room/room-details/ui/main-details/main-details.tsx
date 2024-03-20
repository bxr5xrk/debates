import { Room, RoomStatusEnum } from "@/shared/types";
import { formatSeconds } from "@/shared/lib";

interface MainDetailsProps {
    countdownTotal: number;
    countdownReport: number;
    countdownGrading: number;
    room: Room;
    isAdmin: boolean;
    status: RoomStatusEnum | null;
    currentTeamType: string | undefined | null;
}

export function MainDetails(props: MainDetailsProps): JSX.Element {
    const {
        countdownTotal,
        countdownReport,
        status,
        currentTeamType,
    } = props;

    return (
        <div className="p-4">
            <p className="bg-amber-400 w-max lg:min-w-[250px] text-center font-bold mx-auto 
            text-[30px] md:text-[40px] lg:text-[50px] rounded-[20px] border border-black border-r-4 
            border-b-4 px-4 py-2">
                {formatSeconds(countdownTotal)}
            </p>
            {status === "started"
                ? <p className={currentTeamType === "conTeam"?"text-[25px] md:text-[30px] lg:text-[45px] mx-auto w-max text-red-600 font-bold border-text":"text-[25px] md:text-[30px] lg:text-[45px] font-bold mx-auto w-max text-sky-600 border-text"}>Report</p>
                : <p className="text-amber-400 font-bold text-[25px] md:text-[30px] lg:text-[45px] mx-auto w-max border-text">{status === RoomStatusEnum.PENDING ? "Pending" : "Paused"}</p>
            }
            <div className="flex justify-between">
                <div className="flex sm:flex-row flex-col-reverse gap-[30px] items-center">
                    <p className="min-w-[100px] lg:min-w-[150px]  p-1 lg:p-2 text-[20px] md:text-[25px] lg:text-[40px] h-max rounded-[10px] text-center bg-red border border-black border-b-4 border-r-4 flex justify-center items-center">
                        {currentTeamType === "conTeam"
                            ? formatSeconds(countdownReport)
                            : "--:--"}
                    </p>
                    <div className="flex flex-col items-center">
                        <p className="text-[20px] md:text-[25px] lg:text-[40px] border-text text-red-600 font-bold">Red</p>
                        <p className="text-[25px] md:text-[30px] font-bold">Team</p>
                        {currentTeamType === "conTeam" && <p className="text-[25px] md:text-[45px] border-text text-red-600 font-bold">Your turn</p>}
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-[30px] items-center" >
                    <div className="flex flex-col items-center">
                        <p className="text-[20px] md:text-[25px] lg:text-[40px] border-text text-sky-600 font-bold">Blue</p>
                        <p className="text-[25px] md:text-[30px] font-bold">Team</p>
                        {currentTeamType === "proTeam" && <p className="text-[25px] md:text-[40px] border-text text-sky-600 font-bold">Your turn</p>}
                    </div>
                    <p className="min-w-[100px] lg:min-w-[150px]  p-1 lg:p-2 text-[20px] md:text-[25px] lg:text-[40px] rounded-[10px] text-center bg-blue border border-black border-b-4 border-r-4 flex justify-center items-center">
                        {currentTeamType === "proTeam"
                            ? formatSeconds(countdownReport)
                            : "--:--"}
                    </p>
                </div>
            </div>
        </div>
    );
}
