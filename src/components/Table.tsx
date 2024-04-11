import React from 'react';

const RenderRow = ({ keyName, value }) => {
    if (typeof value === 'object' && value !== null) {
        // If the value is an object, render its properties in a nested table
        return (
            <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th colSpan="2" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {keyName.replace(/_/g, ' ')}
                    </th>
                </tr>
                {Object.entries(value).map(([subKey, subValue]) => (
                    <tr key={subKey} className="bg-gray-100 dark:bg-gray-700">
                        <td className="px-6 py-4 font-medium">{subKey.replace(/_/g, ' ')}</td>
                        <td className="px-6 py-4">{subValue !== null ? subValue.toString() : 'N/A'}</td>
                    </tr>
                ))}
            </>
        );
    } else {
        // Render normal data rows
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {keyName.replace(/_/g, ' ')}
                </th>
                <td className="px-6 py-4">
                    {value !== null ? value.toString() : 'N/A'}
                </td>
            </tr>
        );
    }
};

export const Table = ({ data }) => {
    const keys = Object.keys(data);  // This gets all keys of the data object

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                {keys.map(key => (
                    <RenderRow key={key} keyName={key} value={data[key]} />
                ))}
                </tbody>
            </table>
        </div>
    );
};
