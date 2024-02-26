interface FooterProps {
    hide?: boolean;
}

export function Footer({ hide }: FooterProps): JSX.Element {
    if (hide) {
        return <></>;
    }

    return (
        <footer className="flex border-t w-full">
            <div className="w-full px-2 py-4 max-w-screen-2xl mx-auto">
                Footer
            </div>
        </footer>
    );
}
