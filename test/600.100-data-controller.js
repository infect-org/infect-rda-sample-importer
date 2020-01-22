import section from 'section-tests';
import assert from 'assert';
import ServiceManager from '@infect/rda-service-manager';
import path from 'path';
import Service from '../index.js';
import HTTP2Client from '@distributed-systems/http2-client';
import { AnresisTestData } from '@infect/rda-fixtures';


section('Data Controller', (section) => {
    let sm;

    section.setup(async () => {
        sm = new ServiceManager({
            args: '--dev.testing --log-level=error+ --log-module=* --data-for-dev'.split(' ')
        });
        
        await sm.startServices('@infect/rda-service-registry');
        await sm.startServices('@infect/infect-rda-sample-storage');
        await sm.startServices('@infect/api');
    });
    


    section.test('create import, import samples, commit', async() => {
        const service = new Service();
        await service.load();
        const port = service.getPort();


        const client = new HTTP2Client();
        const response = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.import`).expect(201).send({
            dataSetIdentifier: `controller-dataset-${Math.random()}`,
            dataVersionIdentifier: `controller-identifier-${Math.random()}`,
            dataVersionDescription: `controller-description-${Math.random()}`,
            importProcessorName: `anresis-human`,
        });

        const { id } = await response.getData();
        assert(id);


        const testData = new AnresisTestData();
        const rows = await testData.getData();


        const dataResponse = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.data`).expect(201).send({
            id,
            records: rows,
        });

        const { validSamplesCount, invalidSamplesCount } = await dataResponse.getData();

        assert.equal(validSamplesCount, 99);
        assert.equal(invalidSamplesCount, 0);

        await client.patch(`http://l.dns.porn:${port}/infect-rda-sample-import.import/${id}`).expect(200).send();

        await service.end();
    });
    


    section.test('create import, import samples, delete', async() => {
        const service = new Service();
        await service.load();
        const port = service.getPort();


        const client = new HTTP2Client();
        const response = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.import`).expect(201).send({
            dataSetIdentifier: `controller-dataset-${Math.random()}`,
            dataVersionIdentifier: `controller-identifier-${Math.random()}`,
            dataVersionDescription: `controller-description-${Math.random()}`,
            importProcessorName: `anresis-human`,
        });

        const { id } = await response.getData();
        assert(id);


        const testData = new AnresisTestData();
        const rows = await testData.getData();

        const dataResponse = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.data`).expect(201).send({
            id,
            records: rows,
        });

        const { validSamplesCount, invalidSamplesCount } = await dataResponse.getData();

        assert.equal(validSamplesCount, 99);
        assert.equal(invalidSamplesCount, 0);

        await client.delete(`http://l.dns.porn:${port}/infect-rda-sample-import.import/${id}`).expect(200).send();

        await service.end();
    });
    


    section.test('create import, import samples, commit: report samples', async() => {
        const service = new Service();
        await service.load();
        const port = service.getPort();


        const client = new HTTP2Client();
        const response = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.import`).expect(201).send({
            dataSetIdentifier: `controller-dataset-${Math.random()}`,
            dataVersionIdentifier: `controller-identifier-${Math.random()}`,
            dataVersionDescription: `controller-description-${Math.random()}`,
            importProcessorName: `anresis-human`,
        });

        const { id } = await response.getData();
        assert(id);


        const testData = new AnresisTestData();
        const rows = await testData.getData();

        const dataResponse = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.data`).expect(201).query({
            'return-data': true,
        }).send({
            id,
            records: rows,
        });

        const { validSamples, invalidSamples } = await dataResponse.getData();
        
        assert.equal(validSamples.length, 99);
        assert.equal(invalidSamples.length, 0);

        await client.patch(`http://l.dns.porn:${port}/infect-rda-sample-import.import/${id}`).expect(200).send();

        await service.end();
    });


    


    section.test('create import, import samples, commit: report invalid samples', async() => {
        const service = new Service();
        await service.load();
        const port = service.getPort();


        const client = new HTTP2Client();
        const response = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.import`).expect(201).send({
            dataSetIdentifier: `controller-dataset-${Math.random()}`,
            dataVersionIdentifier: `controller-identifier-${Math.random()}`,
            dataVersionDescription: `controller-description-${Math.random()}`,
            importProcessorName: `anresis-human`,
        });

        const { id } = await response.getData();
        assert(id);


        const testData = new AnresisTestData();
        const rows = await testData.getData();

        const dataResponse = await client.post(`http://l.dns.porn:${port}/infect-rda-sample-import.data`).expect(201).query({
            'return-invalid-data': true,
        }).send({
            id,
            records: rows,
        });

        const invalidSamples = await dataResponse.getData();
        
        assert.equal(invalidSamples.length, 0);

        await client.patch(`http://l.dns.porn:${port}/infect-rda-sample-import.import/${id}`).expect(200).send();

        await service.end();
    });



    section.destroy(async() => {
        await sm.stopServices();
    });
});
