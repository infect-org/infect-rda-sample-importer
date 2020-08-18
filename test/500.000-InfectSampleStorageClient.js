import section from 'section-tests';
import assert from 'assert';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import RegistryClient from '@infect/rda-service-registry-client';
import InfectSampleStorageClient from '../src/lib/InfectSampleStorageClient.js';
import Sample from '../src/lib/Sample.js';
import AnresisHumanSampleProcessor from '../src/lib/processors/AnresisHumanSampleProcessor.js';
import { AnresisTestData } from '@infect/rda-fixtures';



section('Infect Sample Storage Client', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/infect-rda-sample-storage');
        await sm.startServices('@infect/api');
    });
    


    section.test('create import', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host'));

        const client = new InfectSampleStorageClient({
            registryClient,
        });

        await client.load();

        await client.createImport({
            dataSetIdentifier: Math.random()+'',
            dataVersionIdentifier: Math.random()+'',
            dataVersionDescription: Math.random()+'',
        });

        await client.destroy();
    });
    


    section.test('store samples', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host'));

        const client = new InfectSampleStorageClient({
            registryClient,
        });

        await client.load();

        await client.createImport({
            dataSetIdentifier: Math.random()+'',
            dataVersionIdentifier: Math.random()+'',
            dataVersionDescription: Math.random()+'',
        });


        const testData = new AnresisTestData();
        const row = await testData.getOneRow();
        
        const sample = new Sample();
        sample.setOriginalData(row);

        const processor = new AnresisHumanSampleProcessor({ config });
        await processor.load();
        await processor.processSamples([sample]);

        await client.storeSamples([sample]);
        await client.destroy();
    });
    


    section.test('finalize import', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host'));

        const client = new InfectSampleStorageClient({
            registryClient,
        });

        await client.load();

        await client.createImport({
            dataSetIdentifier: Math.random()+'',
            dataVersionIdentifier: Math.random()+'',
            dataVersionDescription: Math.random()+'',
        });


        const testData = new AnresisTestData();
        const row = await testData.getOneRow();
        
        const sample = new Sample();
        sample.setOriginalData(row);

        const processor = new AnresisHumanSampleProcessor({ config });
        await processor.load();
        await processor.processSamples([sample]);



        await client.storeSamples([sample]);
        await client.finalizeImport();
        await client.destroy();
    });
    


    section.test('delete import', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host'));

        const client = new InfectSampleStorageClient({
            registryClient,
        });

        await client.load();

        await client.createImport({
            dataSetIdentifier: Math.random()+'',
            dataVersionIdentifier: Math.random()+'',
            dataVersionDescription: Math.random()+'',
        });


        const testData = new AnresisTestData();
        const row = await testData.getOneRow();
        
        const sample = new Sample();
        sample.setOriginalData(row);

        const processor = new AnresisHumanSampleProcessor({ config });
        await processor.load();
        await processor.processSamples([sample]);


        await client.storeSamples([sample]);
        await client.delete();
        await client.destroy();
    });


    section.destroy(async() => {
        await sm.stopServices();
    });
});
