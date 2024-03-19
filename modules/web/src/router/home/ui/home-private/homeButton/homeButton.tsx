interface HomeButton {
    title: string;
    value: string;
}

export function HomeButton(props:HomeButton): JSX.Element {
    const {title, value} = props;
    return (
        <div className="border-2 border-black border-r-4 border-b-4 max-w-[300px] w-full md:p-4 p-1 rounded-[20px] flex flex-col justify-center">
            <p className="text-center text-[#64748B] lg:text-[30px] md:text-[20px] sm:-text-[16px] text-[16px]">{title}</p>
            <p className="text-center lg:text-[35px] md:text-[20px] sm:-text-[16px] text-[16px]">{value}</p>
        </div>
    );
}