import { StatusHttp } from '../libs/customError.js';
import { User } from '../models/user.model.js';
import bcrypt from '../libs/bcrypt.js';

// Create
async function create(newUser) {
    const {email, password} = newUser;
    console.log(email, password)
    const userFound = await User.findOne({email});

    if(userFound) throw new StatusHttp('Ya existe este email', 404); // Comment: generic message?

    const encryptedPassword = await bcrypt.hash(password);
    console.log(encryptedPassword)

    return User.create({...newUser, password: encryptedPassword});

}

// Update
async function update(idUser, newData) {
    const userFound = await User.findById(idUser);

    if(!userFound) throw new StatusHttp('No existe este user', 404);

    return await User.updateOne({_id: idUser}, newData);
}

// Delete
function deleteById(idUser) {
    const userFound = User.findById(idUser);

    if(!userFound) throw new StatusHttp('No existe este user', 404);

    return User.deleteOne({_id: idUser});
}

// Get By Id
function getById(idUser) {
    return User.findById(idUser);
}

// Get All
function getAll() {
    return User.find({});
}

// GetAllByPage
function getAllByPage(page, limit) {
    return User.find().sort({'createdAt': -1}).skip((page - 1) * limit.limit(limit));
}

export { 
    create, 
    update, 
    deleteById, 
    getById, 
    getAll, 
    getAllByPage 
}