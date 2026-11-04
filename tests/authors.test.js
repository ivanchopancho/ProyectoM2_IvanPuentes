
const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

//lista de tests para authors
describe('Authors API', () => {
    let authorId;

    afterAll(async () => {
        await pool.end();
    });

    test('POST /authors should create an author', async () => {
        const response = await request(app)
            .post('/authors')
            .send({
                name: 'Test Author',
                email: 'test.author@example.com',
                bio: 'Author created for testing'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Author');

        authorId = response.body.id;
    });

    test('GET /authors should return a list of authors', async () => {
        const response = await request(app).get('/authors');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /authors/:id should return an author', async () => {
        const response = await request(app).get(`/authors/${authorId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(authorId);
        expect(response.body.name).toBe('Test Author');
    });

    test('PUT /authors/:id should update an author', async () => {
        const response = await request(app)
            .put(`/authors/${authorId}`)
            .send({
                name: 'Updated Author',
                email: 'updated.author@example.com',
                bio: 'Updated biography'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Updated Author');
        expect(response.body.email).toBe('updated.author@example.com');
    });

    test('DELETE /authors/:id should delete an author', async () => {
        const response = await request(app).delete(`/authors/${authorId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.author.id).toBe(authorId);
        expect(response.body.message).toBe('Autor eliminado correctamente');
    });
});
