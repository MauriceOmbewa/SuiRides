import { SuiClient } from '@mysten/sui.js/client';

export class SuiService {
    private client: SuiClient;

    constructor() {
        this.client = new SuiClient({
            url: process.env.SUI_NODE_URL || 'http://localhost:9000'
        });
    }

    async getRideDetails(objectId: string) {
        return this.client.getObject({
            id: objectId,
            options: { showContent: true }
        });
    }
}
