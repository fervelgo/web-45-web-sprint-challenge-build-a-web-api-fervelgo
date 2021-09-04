const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    const { id } = req.params
    await Projects.get(id)
        .then( project => {
            if (!project) {
                res.status(404).json({message: "No project with that id"})
            } else  {
               req.project = project
                next()
            }
        })
}

function validateProject(req, res, next) {
    const { name, description } = req.body
      if (!name || !description) {
        res.status(400).json({message: "Project is missing requires fields"})
      } else {
        res.json(req.body)
      }
    }

module.exports = {
    validateProjectId,
    validateProject
}


