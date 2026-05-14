'use client';

type AtivoDropdownProps = {
    value: string;
    onChange: (value: string) => void;
}

export const AtivoDropdown = ({ value, onChange }: AtivoDropdownProps) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                appearance-none cursor-pointer
                bg-white hover:bg-gray-50
                text-gray-800 font-medium text-sm
                px-5 py-2.5 pr-9
                rounded-full
                border border-gray-200 outline-none shadow-sm
                bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%200l5%206%205-6z%22%2F%3E%3C%2Fsvg%3E')]
                bg-no-repeat bg-[right_14px_center]
                transition-colors duration-150
            "
        >
            <option value="">Ativos/Inativos</option>
            <option value="true">Ativos</option>
            <option value="false">Inativos</option>
        </select>
    );
};