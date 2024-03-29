import { MAX_FILE_SIZE } from "@/shared/const";
import toast from "react-hot-toast";

export function onUpload(e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File) => void): void {
    if (!e.target.files) {
        return;
    }

    const file = e.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
        toast.error("File size is too big");

        return;

    }

    setFile(file);
}