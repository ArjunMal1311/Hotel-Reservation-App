import React, { useCallback } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";

interface CounterProps {
    title: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ title, value, onChange }) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChange(value - 1);
    }, [onChange, value]);

    return (
        <div className="flex flex-row items-center justify-between bg-purple-100 p-4 rounded-lg shadow-md my-2">
            <div className="flex flex-col">
                <div className="font-medium text-purple-600">{title}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="w-10 h-10 rounded-full border-[1px] border-purple-600 flex items-center justify-center text-purple-600 cursor-pointer hover:bg-purple-200 transition"
                >
                    <FaUserMinus />
                </div>
                <div className="font-light text-xl text-purple-600">{value}</div>
                <div
                    onClick={onAdd}
                    className="w-10 h-10 rounded-full border-[1px] border-purple-600 flex items-center justify-center text-purple-600 cursor-pointer hover:bg-purple-200 transition"
                >
                    <FaUserPlus />
                </div>
            </div>
        </div>
    );
};

export default Counter;
