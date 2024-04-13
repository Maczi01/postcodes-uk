import axios from 'axios';

const URL = 'https://api.postcodes.io/postcodes';

export async function getPostcodes(debouncedInput: string) {

    try {
        if (debouncedInput.length < 2) {
            return [];
        }
        const url = `${URL}/${debouncedInput}/autocomplete`;
        const response = await axios(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Postcodes not found');
    }
}

export async function getPostcodeDetails(postCode: string){
    try {
        const url = `${URL}/${postCode}`;
        const response = await axios(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Postcode not found');
    }
}