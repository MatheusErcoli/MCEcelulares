import { ButtonHTMLAttributes } from "react";
import { AllIcons, Icon } from "./Icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: keyof typeof AllIcons;
}

export const Button = ({
    text,
    className = "w-full text-lg flex items-center justify-center bg-linear-to-r from-[#5714d7] to-[#7929c8] font-bold text-white p-4 rounded-full hover:opacity-90 transition-opacity gap-2 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed mb-2", icon,
    type = "button",
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={className}
            {...props}
        >
            {icon && <Icon name={icon} />}
            {text}
        </button>
    );
}