import section from 'section-tests';
import assert from 'assert';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import RegistryClient from '@infect/rda-service-registry-client';
import Importer from '../src/lib/Importer.js';
import AnresisSampleProcessor from '../src/lib/processors/AnresisSampleProcessor.js';
import InfectSampleStorageClient from '../src/lib/InfectSampleStorageClient.js';
import path from 'path';
import { AnresisTestData } from '@infect/rda-fixtures';


section('Import', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/infect-rda-sample-storage');
        await sm.startServices('@infect/api');
    });
    


    section.test('create import, process samples, finalize', async() => {
        section.setTimeout(20000);
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host')); 

        const sampleProcessor = new AnresisSampleProcessor({ config });
        await sampleProcessor.load();

        const sampleStorage = new InfectSampleStorageClient({
            registryClient,
        });

        await sampleStorage.load();

        const importer = new Importer({
            sampleStorage,
            sampleProcessor,
            config,
        });


        await importer.setupImport({
            dataSetIdentifier: `Import-${Math.random()}`,
            dataVersionIdentifier: `Version-${Math.random()}`,
            dataVersionDescription: `Description-${Math.random()}`,
        });

        const testData = new AnresisTestData();
        const rows = await testData.getData();

        const { validSamples, invalidSamples } = await importer.processData(rows);

        assert.equal(validSamples.length, 99);
        assert.equal(invalidSamples.length, 0);

        await importer.commit();
    });



    


    section.test('create import, process samples, delete', async() => {
        section.setTimeout(20000);
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host')); 

        const sampleProcessor = new AnresisSampleProcessor({ config });
        await sampleProcessor.load();

        const sampleStorage = new InfectSampleStorageClient({
            registryClient,
        });

        await sampleStorage.load();

        const importer = new Importer({
            sampleStorage,
            sampleProcessor,
            config,
        });


        await importer.setupImport({
            dataSetIdentifier: `Import-${Math.random()}`,
            dataVersionIdentifier: `Version-${Math.random()}`,
            dataVersionDescription: `Description-${Math.random()}`,
        });

        const testData = new AnresisTestData();
        const rows = await testData.getData();

        const { validSamples, invalidSamples } = await importer.processData(rows);

        assert.equal(validSamples.length, 99);
        assert.equal(invalidSamples.length, 0);

        await importer.delete();
    });
    



    section.destroy(async() => {
        await sm.stopServices();
    });
});
