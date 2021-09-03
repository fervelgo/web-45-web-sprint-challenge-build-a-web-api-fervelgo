// add middlewares here related to actions
const Action = require('./actions-model')


async function validateActionId(req,res,next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({ message: "No action by that ID breh"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({message: "Couldn't find action breh, check your id plz"})
    }
    
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body
      if (!project_id || !description || !notes) {
        res.status(400).json({message: "Action is missing requires fields"})
      } else {
        req.action = req.body
        next()
      }
    }



module.exports = {
    validateActionId,
    validateAction
}
