type BaseButtonProps = {
    text: string;
    className?: string[];
    width: string;
    height?: string;
    font: string;
    fontSize: string;
};

type buttonProps = BaseButtonProps & {
    Tag: "button" | "div" | "li";
    href?: string;
};

export default buttonProps;