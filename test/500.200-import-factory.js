import section from 'section-tests';
import assert from 'assert';
import RainbowConfig from '@rainbow-industries/rainbow-config';
import RegistryClient from '@infect/rda-service-registry-client';
import Importer from '../src/lib/Importer.js';
import path from 'path';
import ImportFactory from '../src/lib/ImportFactory.js';




section('Import Factory', (section) => {

    section.test('create importer', async() => {
        const configDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../config/');
        const config = new RainbowConfig(configDir);
        await config.load();

        const registryClient = new RegistryClient(config.get('service-registry.host'));

        const factory = new ImportFactory({
            config,
            registryClient,
        });

        const importer = await factory.createImporter({ importProcessorName: 'anresis-human' });

        const hasImporter = factory.hasImporter(importer.getId());

        assert.equal(hasImporter, true);
        assert(factory.getImporter(importer.getId()));
    });
});
