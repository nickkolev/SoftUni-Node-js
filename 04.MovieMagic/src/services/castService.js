const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.create = (castData) => Cast.create(castData);

exports.getAll = () => Cast.find();

exports.getByIds = async (castIds) => {
    const casts = Cast.find({ _id: { $in: castIds } });
    
    return casts;
}