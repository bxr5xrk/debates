"use client";

import * as React from "react";
import { cl } from "@/shared/lib/cl";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    function ({ className, ...props }, ref) {
        return (
            <label
                ref={ref}
                className={cl('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
                {...props}
            />
        );
    });

Label.displayName = "Label";
