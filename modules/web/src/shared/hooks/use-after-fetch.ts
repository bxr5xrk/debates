import { useRouter } from "next/navigation";
import { isString } from "../lib/type-guards";
import { useSWRConfig } from "swr";
import { Status } from "../const/status";
import { ExternalToast, toast } from "sonner";

function useRedirect(): {
    onRedirect: (redirect?: string) => void;
    } {
    const { push } = useRouter();

    function onRedirect(redirect?: string): void {
        if (redirect) {
            push(redirect);
        }
    }

    return {
        onRedirect
    };
}

interface UseAfterFetchProps {
    revalidate?: string[];
    redirect?: string;
}

export function useAfterFetch(props: UseAfterFetchProps): {
    onAfterFetch: (message: [string, string], status?: number, onSuccess?: VoidFunction) => void;
    onRevalidate: VoidFunction;
} {
    const { revalidate, redirect } = props;
    const { mutate } = useSWRConfig();
    const { onRedirect } = useRedirect();

    function onRevalidate(): void {
        if (revalidate) {
            for (const key of revalidate) {
                mutate(key);
            }
        }
    }

    function onAfterFetch(message: [string, string], status?: number, onSuccess?: VoidFunction): void {
        const [success, error] = message;

        if (status === Status.SUCCESS) {
            toast.success(success, toastProps);

            onRevalidate();
            onRedirect(redirect);
            onSuccess?.();
        } else {
            toast.error(error, toastProps);
        }
    }

    return {
        onAfterFetch,
        onRevalidate
    };
}

export function errorMessage(res: unknown): string {
    if (!isString(res)) {
        return "Something went wrong. Please try again later.";
    }

    return res;
}

const toastProps: ExternalToast = {
    duration: 3000,
    position: "top-center",
};
