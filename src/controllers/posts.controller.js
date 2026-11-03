const postsService = require('../services/posts.service');

function isValidId(id) {
    return Number.isInteger(id) && id > 0;
}

async function getAllPosts(req, res) {
    try {
        const posts = await postsService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function getPostById(req, res) {
    try {
        const id = Number(req.params.id);

        if (!isValidId(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function getPostsByAuthor(req, res) {
    try {
        const authorId = Number(req.params.authorId);

        if (!isValidId(authorId)) {
            return res.status(400).json({ error: 'ID de autor inválido' });
        }

        const posts = await postsService.getPostsByAuthor(authorId);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function createPost(req, res) {
    try {
        const { author_id, title, content, published } = req.body;

        if (!isValidId(Number(author_id)) || !title?.trim() || !content?.trim()) {
            return res.status(400).json({
                error: 'author_id, title y content son obligatorios y deben ser válidos'
            });
        }

        if (published !== undefined && typeof published !== 'boolean') {
            return res.status(400).json({
                error: 'published debe ser true o false'
            });
        }

        const post = await postsService.createPost({
            author_id: Number(author_id),
            title: title.trim(),
            content: content.trim(),
            published
        });

        res.status(201).json(post);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({
                error: 'El autor indicado no existe'
            });
        }

        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function updatePost(req, res) {
    try {
        const id = Number(req.params.id);
        const { author_id, title, content, published } = req.body;

        if (!isValidId(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        if (!isValidId(Number(author_id)) || !title?.trim() || !content?.trim()) {
            return res.status(400).json({
                error: 'author_id, title y content son obligatorios y deben ser válidos'
            });
        }

        if (published !== undefined && typeof published !== 'boolean') {
            return res.status(400).json({
                error: 'published debe ser true o false'
            });
        }

        const post = await postsService.updatePost(id, {
            author_id: Number(author_id),
            title: title.trim(),
            content: content.trim(),
            published
        });

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json(post);
    } catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({
                error: 'El autor indicado no existe'
            });
        }

        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function deletePost(req, res) {
    try {
        const id = Number(req.params.id);

        if (!isValidId(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const post = await postsService.deletePost(id);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json({
            message: 'Post eliminado correctamente',
            post
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};