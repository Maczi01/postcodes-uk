import React from 'react';

export const Table = ({ data }) => {
    const allKeys = Object.keys(data);
    const showKeys = ['postcode', 'country', 'longitude', 'latitude', 'nhs_ha', 'primary_care_trust', 'admin_district', 'admin_ward' ];
    const keys = allKeys.filter(key => showKeys.includes(key));

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                {keys.map(key => (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {key.replace(/_/g, ' ')}
                        </th>
                        <td className="px-6 py-4">
                            {data[key] ? data[key].toString() : 'N/A'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
