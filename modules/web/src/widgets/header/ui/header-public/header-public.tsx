import Link from "next/link";

export function HeaderPublic(): JSX.Element {
    return (
        <header className="flex border-b w-full">
            <div className="w-full px-2 py-4 max-w-screen-2xl mx-auto">
                <Link scroll={false} href="/sign-in">
          Sign In
                </Link>
            </div>
        </header>
    );
}