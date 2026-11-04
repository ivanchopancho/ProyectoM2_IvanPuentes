const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');


describe('Posts API', () => {
    let authorId;
    let postId;

    beforeAll(async () => {
        const result = await pool.query(
            `INSERT INTO authors (name, email, bio)
            VALUES ($1, $2, $3)
            RETURNING id`,
            ['Post Test Author', 'post.test.author@example.com', 'Author for post tests']
        );

        authorId = result.rows[0].id;
    });

    afterAll(async () => {
        await pool.end();
    });

    test('POST /posts should create a post', async () => {
        const response = await request(app)
            .post('/posts')
            .send({
                author_id: authorId,
                title: 'Test Post',
                content: 'This is a test post',
                published: true
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Post');

        postId = response.body.id;
    });

    test('GET /posts should return a list of posts', async () => {
        const response = await request(app).get('/posts');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /posts/:id should return a post', async () => {
        const response = await request(app).get(`/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(postId);
        expect(response.body.title).toBe('Test Post');
    });

    test('GET /posts/author/:authorId should return posts by author', async () => {
        const response = await request(app).get(`/posts/author/${authorId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].author_id).toBe(authorId);
    });

    test('PUT /posts/:id should update a post', async () => {
        const response = await request(app)
            .put(`/posts/${postId}`)
            .send({
                author_id: authorId,
                title: 'Updated Test Post',
                content: 'Updated test content',
                published: false
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Updated Test Post');
        expect(response.body.published).toBe(false);
    });

    test('DELETE /posts/:id should delete a post', async () => {
        const response = await request(app).delete(`/posts/${postId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.post.id).toBe(postId);
    });
});
