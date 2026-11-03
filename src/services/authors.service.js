const pool = require('../db');

//logica en sql para consultar servidor

async function getAllAuthors() {
    const result = await pool.query('SELECT * FROM authors ORDER BY id');
    return result.rows;
}


async function getAuthorById(id) {
    const result = await pool.query(
        'SELECT * FROM authors WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

async function createAuthor({ name, email, bio }) {
    const result = await pool.query(
        `INSERT INTO authors (name, email, bio)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, email, bio || null]
    );
    return result.rows[0];
}

async function updateAuthor(id, { name, email, bio }) {
    const result = await pool.query(
        `UPDATE authors
         SET name = $1, email = $2, bio = $3
         WHERE id = $4
         RETURNING *`,
        [name, email, bio || null, id]
    );
    return result.rows[0];
}

async function deleteAuthor(id) {
    const result = await pool.query(
        'DELETE FROM authors WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};



