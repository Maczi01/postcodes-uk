import { z, ZodSchema } from 'zod';

const PostcodeCodesSchema: ZodSchema<PostcodeCodes> = z.object({
    admin_district: z.string(),
    admin_county: z.string(),
    admin_ward: z.string(),
    parish: z.string(),
    parliamentary_constituency: z.string(),
    parliamentary_constituency_2024: z.string(),
    ccg: z.string(),
    ccg_id: z.string(),
    ced: z.string(),
    nuts: z.string(),
    lsoa: z.string(),
    msoa: z.string(),
    lau2: z.string(),
    pfa: z.string(),
});

const PostcodeResultSchema: ZodSchema<PostcodeResult> = z.object({
    postcode: z.string(),
    quality: z.number(),
    eastings: z.number(),
    northings: z.number(),
    country: z.string(),
    nhs_ha: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    european_electoral_region: z.string(),
    primary_care_trust: z.string(),
    region: z.string().nullable(),
    lsoa: z.string(),
    msoa: z.string().nullable(),
    incode: z.string(),
    outcode: z.string(),
    parliamentary_constituency: z.string(),
    parliamentary_constituency_2024: z.string(),
    admin_district: z.string(),
    parish: z.string().nullable(),
    admin_county: z.string().nullable(),
    date_of_introduction: z.string(),
    admin_ward: z.string(),
    ced: z.string().nullable(),
    ccg: z.string(),
    nuts: z.string(),
    pfa: z.string(),
    codes: PostcodeCodesSchema,
});

const ApiResponseSchema: ZodSchema<PostcodesResponse> = z.object({
    status: z.number(),
    result: PostcodeResultSchema,
});

export { ApiResponseSchema, PostcodeResultSchema, PostcodeCodesSchema };
