const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");

const { genSaltSync, hashSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "*Record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  login: (req, res) => {
      const body = req.body;
      getUserByUserEmail(body.email, (err, results) =>{
          if (err) {
              console.log(err);
          }
          if (!results) {
              return res.json({
                  success: 0,
                  message: "Invalid email or password 1"
              });
          }
          const result = compare(body.password, results.password);
          if (result) {
              results.password = undefined;
              const jsontoken = sign({result: results}, "qwe1234", {
                  expiresIn: "1h"
              });
              return res.json({
                  success: 1,
                  message: "login successfully",
                  token: jsontoken,
                  result: results
              });
          }
          else {
              return res.json({
                  success: 0,
                  message: "Invalid email or passowrd 2"
              });
          }
      });
  }
};
