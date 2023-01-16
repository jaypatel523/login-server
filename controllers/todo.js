

const createToDo = async (req, res) => {
    res.send({ msg: req.body.name });
}



module.exports = { createToDo };