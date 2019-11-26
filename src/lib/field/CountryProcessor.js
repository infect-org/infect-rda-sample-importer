import APILookup from '../../APILookup.js';


const countries = new Set(['AFG', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 
                           'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 
                           'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 
                           'BTN', 'BOL', 'BOL', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 
                           'BRN', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 
                           'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 
                           'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'CIV', 
                           'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 
                           'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 
                           'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 
                           'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 
                           'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 
                           'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 
                           'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 
                           'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KOR', 
                           'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 
                           'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 
                           'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 
                           'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 
                           'MAR', 'MOZ', 'MMR', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 
                           'ANT', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 
                           'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 
                           'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 
                           'REU', 'ROU', 'RUS', 'RUS', 'RWA', 'SHN', 'KNA', 'LCA', 
                           'SPM', 'VCT', 'VCT', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 
                           'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 
                           'SOM', 'ZAF', 'SGS', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 
                           'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TWN', 'TJK', 'TZA', 
                           'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TTO', 'TUN', 
                           'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 
                           'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VEN', 'VNM', 
                           'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE']);



export default class CountryProcessor {


    constructor({
        apiHost,
    }) {
        this.lookup = new APILookup({
            apiHost: apiHost,
            resource: 'generics.country',
            filterProperty: 'iso3',
            selectionField: 'id',
        });
    }


    async process(value) {
        if (typeof value !== 'string') {
            throw new Error(`[Sample.Field.Country] Invalid value '${value}': expected a string, got ${typeof value}!`);
        }

        if (value.length !== 3) {
            throw new Error(`[Sample.Field.Country] Invalid value '${value}': length must be 3!`);
        }

        value = value.toUpperCase();


        if (!countries.has(value)) {
            throw new Error(`[Sample.Field.Country] Invalid value '${value}': the value is not a valid iso 3166-1 alpha-3 code!`);
        }

        const id = await this.lookup.get(value);

        return id;
    }
}
