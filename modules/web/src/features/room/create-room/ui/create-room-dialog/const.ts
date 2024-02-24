import { UseFieldArrayProps } from "react-hook-form";
import { CreateRoomFormData } from "../../types";

export const conTeamIdsRules: Pick<UseFieldArrayProps<CreateRoomFormData, "conTeamIds", "id">, "rules">["rules"] = {
    required: "Con team members are required",
    validate: (value) => {
        if (value.find((v) => !v.id)) {
            return "Con team members are required";
        }

        return true;
    }
};

export const proTeamIdsRules: Pick<UseFieldArrayProps<CreateRoomFormData, "proTeamIds", "id">, "rules">["rules"] = {
    required: "Pro team members are required",
    validate: (value) => {
        if (value.find((v) => !v.id)) {
            return "Pro team members are required";
        }

        return true;
    }
};