# Infect RDA Sample Storage Importer



class INFECTV2Importer extends Importer {
    

    constructor() {
        super();

        this.registerSmapleProcessor(new INFECTv2Sample());
    }
}





class INFECTv2Sample extends Sample {
    

    constructor() {
        super();

        this.registerField('unique-identifier', new UniqueIdentiferiField());
        this.setRequiredField('A', 'B', '');
        this.setColumnIndex('unique-identifier, 1');

        this.setMappingProcessor(new RemoteAPIProcessor());
    }
}
