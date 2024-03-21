import supertest from "supertest";
import { app } from '../src/application/web.js';
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test-utils.js";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });


    it('should can create new contact', async () => {
        const result = await supertest(app)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: 'test',
                email: 'test@aufal.com',
                phone: "08512345678"
            });

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.email).toBe('test@aufal.com')
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(app)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: 'test',
                email: 'test@aufal.com',
                phone: "085126696969699696996969699696969969696969345678"
            });

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    });
});