// Write your "projects" router here!
const express = require('express');
const { validateProjectId } = require('./projects-middleware.js')

const Projects =require('./projects-model.js')

const router = express.Router();


router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
        res.json(projects);
    })
    .catch(next)
    });

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', (req, res, next) => {
    Projects.insert({
        name: req.name, 
        description: req.description})
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, (req, res, next) => {
    Projects.update(req.params.id, req.project)
    .then(updatedProject => {
        res.json(updatedProject)
    })
    .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    const response = await Projects.remove(req.params.id)
    res.json(response)
  } catch (err) {
      next(err)
  }
})
    

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const response = await Projects.getProjectActions(req.params.id)
        res.json(response)
    } catch (err) {
        next(err)
    }
})

module.exports = router;