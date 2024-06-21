const mongoose = require("mongoose");

exports.getErrorMessage = (err) => {
    if (err instanceof mongoose.MongooseError) {
        return Object.values(err.errors).at(0).message;
    } else if (err instanceof Error) {
        return err.message;
    } 

};

exports.parseError = (err) => {
    if (err instanceof Error) {
        if(!err.errors) {
            err.errors = [err.message];
        } else {
            const error = new Error('Input validation error');
            error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));

            return error;
        }
    } else if (Array.isArray(err)) {
        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(err.map(e => [e.path, e.message]));

        return error;
    }

    return err;
};