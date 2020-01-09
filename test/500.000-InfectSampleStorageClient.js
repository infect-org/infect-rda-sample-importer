import section from 'section-tests';
import assert from 'assert';
import path from 'path';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import ServiceManager from '@infect/rda-service-manager';
import RegistryClient from '@infect/rda-service-registry-client';
import InfectSampleStorageClient from '../src/lib/InfectSampleStorageClient.js';



class Sample {
    toJSON() {
        return {
            bacteriumId: Math.round(Math.random()*50),
            antibioticId: Math.round(Math.random()*50),
            ageGroupId: Math.round(Math.random()*10),
            hospitalStatusId: Math.round(Math.random()*3),
            regionId: Math.round(Math.random()*10),
            sampleDate: new Date().toISOString(),
            resistance: Math.round(Math.random()*2),
            uniqueIdentifier: 'sample-id-'+Math.round(Math.random()*100000000000000000),
        };
    }
}


section('Infect Sample Storage Client', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/infect-rda-sample-storage');
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


        const sample = new Sample();

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


        const sample = new Sample();

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


        const sample = new Sample();

        await client.storeSamples([sample]);
        await client.delete();
        await client.destroy();
    });


    section.destroy(async() => {
        await sm.stopServices();
    });
});
