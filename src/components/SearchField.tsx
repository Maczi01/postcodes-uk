import { ComponentProps } from 'react';

import { ClearIcon } from './ClearIcon.tsx';

type InputProps = {
    value?: string;
    suggestions?: string[];
    onSuggestionClick: (value: string) => void;
    clear: () => void;
} & ComponentProps<'input'>;

export const SearchField = ({ suggestions, onSuggestionClick, ...props }: InputProps) => {
    return (
        <div className="my-4 p-2 w-full">
            <div className="relative w-full">
                <input
                    {...props}
                    className="w-full px-4 py-2 border rounded shadow appearance-none"
                />
                {suggestions && suggestions.length > 0 && (
                    <ul
                        className="absolute z-10 w-full border 
                    bg-white shadow-lg max-h-60 overflow-auto rounded mt-1"
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => onSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <ClearIcon onClick={props.clear} />
            </div>
        </div>
    );
};
