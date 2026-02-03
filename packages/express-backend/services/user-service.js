import userModel from "../models/user.js";

function getUsers(name, job) {
  let promise;

  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && job) {
    promise = findUsersByNameAndJob(name, job);
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }

  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUsersByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  getUsers,
  findUserById,
  addUser,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  deleteUserById,
};
