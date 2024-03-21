import supertest from "supertest";
import { app } from '../src/application/web.js';
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-utils.js";
import { logger } from "../src/application/logging.js";

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

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.email).toBe('test@aufal.com');
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

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can get contact', async () => {
        const testContact = await getTestContact();
        const result = await supertest(app)
            .get('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.email).toBe(testContact.email);
    });


    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();


        const result = await supertest(app)
            .get('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(app)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "aufal",
                last_name: "marom",
                email: "aufal@test.com",
                phone: "0857759292",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.first_name).toBe('aufal');
        expect(result.body.data.email).toBe('aufal@test.com');
    });


    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(app)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "marom",
                email: "aufal",
                phone: "",
            });

        expect(result.status).toBe(400);
    });

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(app)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: "aufal",
                last_name: "marom",
                email: "aufal@test.com",
                phone: "0857759292",
            });

        expect(result.status).toBe(404);
    });

});

describe('DELETE /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it('should can delete contact', async () => {
        let testContact = await getTestContact();

        const result = await supertest(app)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');
        logger.info("INI LOGGER")
        logger.info(result)
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });


    it('should reject if contact is not found', async () => {
        let testContact = await getTestContact();

        const result = await supertest(app)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');
        logger.info("INI LOGGER")
        logger.info(result)
        expect(result.status).toBe(404);
    });

});