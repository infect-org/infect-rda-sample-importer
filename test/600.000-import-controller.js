import section from 'section-tests';
import assert from 'assert';
import ServiceManager from '@infect/rda-service-manager';
import Service from '../index.js';
import HTTP2Client from '@distributed-systems/http2-client';




section('Import Controller', (section) => {
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

        await service.end();
    });
    



    section.test('create import, delete', async() => {
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

        await client.delete(`http://l.dns.porn:${port}/infect-rda-sample-import.import/${id}`).expect(200).send();

        await service.end();
    });
    



    section.destroy(async() => {
        await sm.stopServices();
    });
});
