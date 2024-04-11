import { ComponentProps } from 'react';

type InputProps = {
    value?: string;
} & ComponentProps<'input'>;

export const TextField = (props: InputProps) => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            className="px-4 py-2 border rounded shadow"
            value={props.value}
            onChange={props.onChange}
        />
    );
};
