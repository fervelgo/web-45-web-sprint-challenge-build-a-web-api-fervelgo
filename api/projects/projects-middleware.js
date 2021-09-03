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

module.exports = {
    validateProjectId
}


