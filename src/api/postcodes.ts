import axios from 'axios';

export async function getPostcodes(debouncedInput: string) {
    // const url = `https://api.postcodes.io/postcodes/autocomplete`;
    const url = `https://postcodes.io/postcodes/${debouncedInput}/autocomplete`;
    const response = await axios(url);
    // console.log({response })
    // if (response.status === 404) throw new Error('Countries not found');
    return response.data;
}

export async function getPostcodeDetails(postCode: string){
    const url = `https://postcodes.io/postcodes/${postCode}`;
    const response = await axios(url);
    console.log({response })
    // if (response.status === 404) throw new Error('Countries not found');
    return response.data;
}