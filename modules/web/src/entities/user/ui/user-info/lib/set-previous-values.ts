import { Me, UserFormData } from "@/entities/user";

export function setPreviousValues(data?: Me): UserFormData {
    if (!data) {
        return {
            email: "",
            name: "",
            nickname: "",
        };
    }

    return {
        email: data.data.email,
        name: data.data.name,
        nickname: data.data.nickname,
    };
}