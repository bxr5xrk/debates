import { PropsWithChildren } from "react";
import { ProtectedRoute } from "../protected-route";
import { cl } from "@/shared/lib/cl";

interface PageProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    protect?: boolean;
}

export function Page(props: PropsWithChildren<PageProps>): JSX.Element {
    const { children, protect, className, ...meta } = props;

    if (protect) {
        return (
            <ProtectedRoute>
                <main
                    {...meta}
                    className={cl(
                        "p-2 w-full h-full max-w-screen-2xl mx-auto",
                        className
                    )}
                >
                    {children}
                </main>
            </ProtectedRoute>
        );
    }

    if (protect) {
        return (
            <ProtectedRoute>
                <main
                    {...meta}
                    className={cl(
                        "p-2 w-full h-full max-w-screen-2xl mx-auto",
                        className
                    )}
                >
                    {children}
                </main>
            </ProtectedRoute>
        );
    }

    return (
        <main {...meta} className={cl("flex-auto", className)}>
            {children}
        </main>
    );
}
