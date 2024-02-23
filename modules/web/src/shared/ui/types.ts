type BaseButtonProps = {
    className?: string[];
    width: string;
    height?: string;
    font: string;
    fontSize: string;
    children?: React.ReactNode;
};

type buttonProps = BaseButtonProps & {
    Tag: "button" | "div" | "li";
    href?: string;
};

export default buttonProps;