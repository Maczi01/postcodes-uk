import { PostcodesResponse } from '../types/Postcode';

type DisplayKeys = {
    postcode: string;
    country: string;
    longitude: number;
    latitude: number;
    nhs_ha: string;
    primary_care_trust: string;
    admin_district: string;
    admin_ward: string;
};

type Props = {
    data: PostcodesResponse | undefined;
    isLoading: boolean;
    error: Error | null;
};

export const PostcodeDetails = ({ data, isLoading, error }: Props) => {
    if (isLoading) {
        return <div className="flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center">Error: {error.message}</div>;
    }

    if (!data || !data.result) {
        return (
            <div className="flex items-center justify-center">
                No data available, type something
            </div>
        );
    }

    const result: DisplayKeys = {
        postcode: data.result.postcode,
        country: data.result.country,
        longitude: data.result.longitude,
        latitude: data.result.latitude,
        nhs_ha: data.result.nhs_ha,
        primary_care_trust: data.result.primary_care_trust,
        admin_district: data.result.admin_district,
        admin_ward: data.result.admin_ward,
    };

    return (
        <div className="relative overflow-x-auto">
            <table
                className="w-full text-sm text-left rtl:text-right 
            text-gray-500 dark:text-gray-400"
            >
                <tbody>
                    {Object.entries(result).map(([key, value]) => (
                        <tr
                            key={key}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 
                                whitespace-nowrap dark:text-white"
                            >
                                {key.replace(/_/g, ' ')}
                            </th>
                            <td className="px-6 py-4">
                                {value !== null && value !== undefined ? value.toString() : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
