import SampleProcessor from '../SampleProcessor.js';

import AnimalProcessor from '../field/AnimalProcessor.js';
import AnresisMicroorganismProcessor from '../field/AnresisMicroorganismProcessor.js';
import AnresisRegionProcessor from '../field/AnresisRegionProcessor.js';
import AnresisSubstanceProcessor from '../field/AnresisSubstanceProcessor.js';
import CountryProcessor from '../field/CountryProcessor.js';
import IsScreeningProcessor from '../field/IsScreeningProcessor.js';
import PatientAgeProcessor from '../field/PatientAgeProcessor.js';
import PatientAgeRangeProcessor from '../field/PatientAgeRangeProcessor.js';
import PatientSettingProcessor from '../field/PatientSettingProcessor.js';
import PatientSexProcessor from '../field/PatientSexProcessor.js';
import ResistanceProcessor from '../field/ResistanceProcessor.js';
import SampleCollectionDateProcessor from '../field/SampleCollectionDateProcessor.js';
import SampleSourceBloodProcessor from '../field/SampleSourceBloodProcessor.js';
import SampleSourceOtherProcessor from '../field/SampleSourceOtherProcessor.js';
import SampleSourceUrineProcessor from '../field/SampleSourceUrineProcessor.js';
import UniqueIdentifierProcessor from '../field/UniqueIdentifierProcessor.js';




export default class AnresisProcessor extends SampleProcessor {


    async load() {
        const apiHost = this.config.get('core-data.host');

        this.registerFieldProcessor(new AnimalProcessor({ apiHost }));
        this.registerFieldProcessor(new AnresisMicroorganismProcessor({ apiHost }));
        this.registerFieldProcessor(new AnresisRegionProcessor({ apiHost }));
        this.registerFieldProcessor(new AnresisSubstanceProcessor({ apiHost }));
        this.registerFieldProcessor(new CountryProcessor({ apiHost }));
        this.registerFieldProcessor(new IsScreeningProcessor());
        this.registerFieldProcessor(new PatientAgeProcessor());
        this.registerFieldProcessor(new PatientAgeRangeProcessor());
        this.registerFieldProcessor(new PatientSettingProcessor({ apiHost }));
        this.registerFieldProcessor(new PatientSexProcessor({ apiHost }));
        this.registerFieldProcessor(new ResistanceProcessor());
        this.registerFieldProcessor(new SampleCollectionDateProcessor());
        this.registerFieldProcessor(new SampleSourceBloodProcessor());
        this.registerFieldProcessor(new SampleSourceOtherProcessor());
        this.registerFieldProcessor(new SampleSourceUrineProcessor());
        this.registerFieldProcessor(new UniqueIdentifierProcessor());

        await super.load();
    }
}