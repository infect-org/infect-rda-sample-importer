export default class GenotypeResistanceProcessor {



    async process(value) {
        if (typeof value !== 'string') {
            throw new Error(`[Sample.Field.GenotypeResistance] Invalid value '${value}': expected string, got ${typeof value}!`);
        }

        if (value.length !== 1) {
            throw new Error(`[Sample.Field.GenotypeResistance] Invalid value '${value}': length must be 1!`);
        }

        if (!(/[ris]{1}/i.test(value))) {
            throw new Error(`[Sample.Field.GenotypeResistance] Invalid value '${value}': value must be either r, i or s!`);
        }


        return value.toLowerCase();
    }
}
