import { Controller } from '@infect/rda-service';
import type from '@distributed-systems/types';



export default class ImportController extends Controller {



    constructor({
        importFactory,
    }) {
        super('import');

        this.importFactory = importFactory;

        this.enableAction('create');
        this.enableAction('update');
        this.enableAction('delete');
    }



    async create(request) {
        const data = await request.getData();

        if (!data) request.response().status(400).send(`Missing request body!`);
        else if (!type.object(data)) request.response().status(400).send(`Request body must be a json object!`);
        else if (!type.string(data.dataSetIdentifier)) request.response().status(400).send(`Missing parameter 'dataSetIdentifier' in request body!`);
        else if (!type.string(data.dataVersionIdentifier)) request.response().status(400).send(`Missing parameter 'dataVersionIdentifier' in request body!`);
        else if (!type.string(data.dataVersionDescription)) request.response().status(400).send(`Missing parameter 'dataVersionDescription' in request body!`);
        else if (!type.string(data.importProcessorName)) request.response().status(400).send(`Missing parameter 'importProcessorName' in request body!`);
        else {
            const importer = await this.importFactory.createImporter({
                importProcessorName: data.importProcessorName
            });

            await importer.setupImport({
                dataSetIdentifier: data.dataSetIdentifier,
                dataVersionIdentifier: data.dataVersionIdentifier,
                dataVersionDescription: data.dataVersionDescription,
            });

            return {
                id: importer.getId(),
            }
        }
    }





    async update(request) {
        const id = request.getParameter('id');

        if (!this.importFactory.hasImporter(id)) {
            return request.response().status(400).send(`Importer '${id}' does not exist!`);
        }

        const importer = this.importFactory.getImporter(id);

        await importer.commit();
    }





    async delete(request) {
        const id = request.getParameter('id');

        if (!this.importFactory.hasImporter(id)) {
            return request.response().status(400).send(`Importer '${id}' does not exist!`);
        }

        const importer = this.importFactory.getImporter(id);

        await importer.delete();
    }
}
