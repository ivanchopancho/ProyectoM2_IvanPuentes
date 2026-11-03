const pool = require('../db');


//reutilizaré esta consulta en varias ocasiones para obtener informacionde los autores a partir de sus posts
const postQuery = `
    SELECT
        p.*,
        a.name AS author_name,
        a.email AS author_email
    FROM posts AS p
    JOIN authors AS a ON p.author_id = a.id
`;

async function getAllPosts() {
    const result = await pool.query(`${postQuery} ORDER BY p.id`);
    return result.rows;
}

async function getPostById(id) {
    const result = await pool.query(
        `${postQuery} WHERE p.id = $1`,
        [id]
    );
    return result.rows[0];
}

async function getPostsByAuthor(authorId) {
    const result = await pool.query(
        `${postQuery} WHERE p.author_id = $1 ORDER BY p.id`,
        [authorId]
    );
    return result.rows;
}

async function createPost({ author_id, title, content, published }) {
    const result = await pool.query(
        `INSERT INTO posts (author_id, title, content, published)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [author_id, title, content, published ?? false]
    );
    return result.rows[0];
}

async function updatePost(id, { author_id, title, content, published }) {
    const result = await pool.query(
        `UPDATE posts
         SET author_id = $1,
             title = $2,
             content = $3,
             published = $4
         WHERE id = $5
         RETURNING *`,
        [author_id, title, content, published ?? false, id]
    );
    return result.rows[0];
}

async function deletePost(id) {
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};