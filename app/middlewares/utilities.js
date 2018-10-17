const { ObjectID } = require('mongodb');

const validateID = function(req, res, next){
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.send({
            notice: 'Invalid Object Id'
        });
    } else {
        next();
    }
}

module.exports = {
    validateID
}