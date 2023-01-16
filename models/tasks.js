const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    tasks: [
        {
            task: {
                type: String
            }
        }
    ]
});


module.exports = mongoose.model('task', TaskSchema);