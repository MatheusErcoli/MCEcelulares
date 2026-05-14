import { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";

type InputVariant = "gray" | "white";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    placeholder: string;
    className?: string;
    mask?: string;
    variant?: InputVariant;
    onAccept?: (value: string) => void;
}

const variantStyles: Record<InputVariant, string> = {
    gray: "w-full rounded-full bg-gray-200 px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50",
    white: "w-full rounded-full bg-white px-6 py-4 text-gray-700 outline-none transition-all focus:ring-2 focus:ring-[#6211f1]/50 shadow-sm border border-gray-200",
};

export const Input = ({
    name,
    type,
    placeholder,
    className,
    mask,
    variant = "gray",
    onAccept,
    ...props
}: InputProps) => {
    return (
        <IMaskInput
            name={name}
            type={type}
            placeholder={placeholder}
            className={className ?? variantStyles[variant]}
            onAccept={onAccept}
            {...(mask ? { mask } : {})}
            {...(props as object)}
        />
    );
};