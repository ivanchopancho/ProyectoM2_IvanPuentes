
const authorsService = require('../services/authors.service');

//logica para returnar el resultado de consultas exitosas o fallidas 

async function getAllAuthors(req, res) {
    try {
        const authors = await authorsService.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        console.error('Error al obtener autores:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function getAuthorById(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function createAuthor(req, res) {
    try {
        const { name, email, bio } = req.body;

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                error: 'El nombre y el email son obligatorios'
            });
        }

        const author = await authorsService.createAuthor({
            name: name.trim(),
            email: email.trim(),
            bio
        });

        res.status(201).json(author);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Ya existe un autor con ese email'
            });
        }

        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function updateAuthor(req, res) {
    try {
        const id = Number(req.params.id);
        const { name, email, bio } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        if (!name?.trim() || !email?.trim()) {
            return res.status(400).json({
                error: 'El nombre y el email son obligatorios'
            });
        }

        const author = await authorsService.updateAuthor(id, {
            name: name.trim(),
            email: email.trim(),
            bio
        });

        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }

        res.status(200).json(author);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Ya existe un autor con ese email'
            });
        }

        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function deleteAuthor(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const author = await authorsService.deleteAuthor(id);

        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }

        res.status(200).json({
            message: 'Autor eliminado correctamente',
            author
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};