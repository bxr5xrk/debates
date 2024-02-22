import { UserFormData } from "@/entities/user";

export function getFormData(data: UserFormData, file: File | null): FormData {
    const formData = new FormData();

    if (data.email) {
        formData.append("email", data.email);
    }
    if (data.name) {
        formData.append("name", data.name);
    }
    if (data.nickname) {
        formData.append("nickname", data.nickname);
    }
    if (file) {
        formData.append("picture", file);
    }

    return formData;
}