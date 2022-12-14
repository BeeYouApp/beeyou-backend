import { StatusHttp } from "../libs/statusHttp.js";
import { User } from "../models/users.model.js";
import bcrypt from "../libs/bcrypt.js";

async function create(newUser) {
  const { email, password } = newUser;
  const userFound = await User.findOne({ email });
  if (userFound) throw new StatusHttp("Ya existe este email", 404);
  const encryptedPassword = await bcrypt.hash(password);
  return User.create({ ...newUser, password: encryptedPassword });
}

async function update(idUser, newData, file) {
  const { password } = newData;
  if (password) {
    const encryptedPassword = await bcrypt.hash(password);
    if(file){
      const user = await User.findById(idUser);
      if (user.avatar && user.keyAvatar) {
      s3.deleteObject({
        Key: user.keyAvatar,
        Bucket: process.env.AWS_BUCKET_NAME
      }).promise();
    }
      const { location, key } = file;
      const userToSave = { ...newData, avatar: location, keyAvatar: key };
      return await User.findByIdAndUpdate(idUser, {...userToSave, password: encryptedPassword,});
    }else{
      return await User.findByIdAndUpdate(idUser, {...newData, password: encryptedPassword,});
    }
  } else {
    if(file){
      const user = await User.findById(idUser);
      if (user.avatar && user.keyAvatar) {
      s3.deleteObject({
        Key: user.keyAvatar,
        Bucket: process.env.AWS_BUCKET_NAME
      }).promise();
    }
      const { location, key } = file;
      const userToSave = { ...newData, avatar: location, keyAvatar: key };
      return await User.findByIdAndUpdate(idUser, userToSave);
    }else{
      return await User.findByIdAndUpdate(idUser, newData);
    }
  }
}

async function deleteById(idUser) {
  const userFound = await User.findById(idUser);

  if (!userFound) throw new StatusHttp("No existe este user", 404);

  return await User.deleteOne({ _id: idUser });
}

async function getById(idUser) {
  return await User.findById(idUser).populate("events rankings");
}

async function getAll() {
  return await User.find({}).populate("events rankings");
}

async function getAllByPage(page, limit) {
  console.log(limit);
  return await User.find().populate("events rankings")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
}

export { create, update, deleteById, getById, getAll, getAllByPage };
