import Link from "next/link";

export function HeaderPublic(): JSX.Element {
    return (
        <header className="flex border-b w-full h-14 items-center">
            <div className="w-full px-2 py-4 max-w-screen-2xl mx-auto">
                <Link
                    href="/sign-up"
                    className="ml-auto font-bold w-21 text-25 transition duration-1000
                after:content-[''] after:hover:bg-blackLight"
                >
                    Sign Up
                </Link>
            </div>
        </header>
    );
}