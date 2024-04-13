type ApiResponse = {
    status: number;
    result: PostcodeResult;
};

type PostcodeResult = {
    postcode: string;
    quality: number;
    eastings: number;
    northings: number;
    country: string;
    nhs_ha: string;
    longitude: number;
    latitude: number;
    european_electoral_region: string;
    primary_care_trust: string;
    region: string | null;
    lsoa: string;
    msoa: string | null;
    incode: string;
    outcode: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    admin_district: string;
    parish: string | null;
    admin_county: string | null;
    date_of_introduction: string;
    admin_ward: string;
    ced: string | null;
    ccg: string;
    nuts: string;
    pfa: string;
    codes: PostcodeCodes;
};

type PostcodeCodes = {
    admin_district: string;
    admin_county: string;
    admin_ward: string;
    parish: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    ccg: string;
    ccg_id: string;
    ced: string;
    nuts: string;
    lsoa: string;
    msoa: string;
    lau2: string;
    pfa: string;
};
