import { ApiResponseType } from '../types/ApiResponseType.ts';
import { PostcodesResponse } from '../types/Postcode.ts';
import { api } from './api.ts';

export async function getSuggestedPostcodes(
    debouncedInput: string,
): Promise<{ status: number; result: string[] }> {
    try {
        const url = `postcodes/${debouncedInput}/autocomplete`;
        const response = await api.get<ApiResponseType<{ status: number; result: string[] }>>(url);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new Error('Postcodes not found');
    }
}

export async function getPostcodeDetails(postCode: string) {
    try {
        const url = `postcodes/${postCode}`;
        const response = await api.get<ApiResponseType<PostcodesResponse>>(url);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        throw new Error('Postcode not found');
    }
}
