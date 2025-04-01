const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const { Project, User } = require('../models');

router.get('/', auth, async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            userId: req.user.id,
            creatorName: req.user.username
        });

        const projectWithUser = await Project.findOne({
            where: { id: project.id },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });


        res.status(201).send(projectWithUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).send({ error: 'Проект не найден' });
        }

        if (project.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send({ error: 'Нет прав на редактирование' });
        }

        await project.update({
            title: req.body.title,
            description: req.body.description
        });

        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).send({ error: 'Проект не найден' });
        }

        if (project.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send({ error: 'Нет прав на удаление' });
        }

        await project.destroy();
        res.send({ message: 'Проект успешно удален' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router; 