import Clear from '../assets/clear.svg';

type ClearIconProps = {
    onClick: () => void;
};

export const ClearIcon = ({ onClick }: ClearIconProps) => {
    return (
        <div
            onClick={onClick}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 mx-2 cursor-pointer"
        >
            <img src={Clear} alt="clear button" />
        </div>
    );
};
