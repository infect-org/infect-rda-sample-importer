import { Controller } from '@infect/rda-service';
import type from '@distributed-systems/types';



export default class ImportController extends Controller {



    constructor({
        importFactory,
    }) {
        super('data');

        this.importFactory = importFactory;
        this.enableAction('create');
    }



    async create(request) {
        const data = await request.getData().catch((err) => {
            console.log('err', err);
            throw err;
        });

        if (!data) request.response().status(400).send(`Missing request body!`);
        else if (!type.object(data)) request.response().status(400).send(`Request body must be a json object!`);
        else if (!type.string(data.id)) request.response().status(400).send(`Missing parameter 'id' in request body!`);
        else if (!type.array(data.records)) request.response().status(400).send(`Missing parameter 'records' in request body!`);
        else {
            if (!this.importFactory.hasImporter(data.id)) {
                return request.response().status(400).send(`Importer '${data.id}' doeas not exist!`);
            }

            const importer = this.importFactory.getImporter(data.id);
            const {
                validSamples,
                invalidSamples,
                importedRecordCount,
                duplicateRecordCount,
                totalRecordCount,
            } = await importer.processData(data.records);

            if (request.hasQueryParameter('return-data')) {
                return {
                    validSamples: validSamples.map(s => s.getJSONReport()),
                    invalidSamples: invalidSamples.map(s => s.getJSONReport()),
                    importedRecordCount,
                    duplicateRecordCount,
                    totalRecordCount,
                };
            }

            if (request.hasQueryParameter('return-invalid-data')) {
                return invalidSamples.map(s => s.getJSONReport());
            }

            return {
                validSamplesCount: validSamples.length,
                invalidSamplesCount: invalidSamples.length,
                importedRecordCount,
                duplicateRecordCount,
                totalRecordCount,
            };
        }
    }
}
