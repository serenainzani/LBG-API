const request = require('supertest');
const app = require('./app').app;
const build = require('./app').itemBuilder;

// unit testing the item builder
describe('Unit Tests', () => {

    test('item object builder', () => {
        expect(build('', '', '', ''))
            .toMatchObject(
                {}
            );
    });

});

describe('GET requests', () => {

    test('GET /read endpoint, expect 200', async () => {
        const res = await request(app).get('/read')
        expect(res.statusCode).toBe(200);
    });

    // time to create a bad endpoint test (404)
    test('GET wrong endpoint, expect 404', async () => {
        const res = await request(app).get('/reeeeda')
        expect(res.statusCode).toBe(404);
    });

    test('GET /read/<id> endpoint search for an item, expect 200', async () => {
        const res = await request(app)
            .get('/read/1')
        expect(res.statusCode).toBe(200);
    });


});

describe('POST request', () => {

    // we could also test the create request

    test('POST /create endpoint send an object, expect 201', async () => {
        const res = await request(app)
            .post('/create')
            .send({});
        expect(res.statusCode).toBe(201);
    });


});

//cant do delete due to no data in it



//Not possible rn due to mocking needed
// describe('UPDATE request', () => {
//     test('UPDATE /update endpoint send an object, expect 200', async () => {
//         const res = await request(app)
//             .update('/update/1')
//             .send({});
//         expect(res.statusCode).toBe(404);
//     });
//});