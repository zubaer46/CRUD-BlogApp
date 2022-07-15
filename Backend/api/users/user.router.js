const {
  createUser,
  getUserById,
  getUsers,
  updateUsers,
  deleteUser,
  login } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/signup", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id",  getUserById);
router.put("/update/:id",  updateUsers);
router.delete("/",  deleteUser);
router.post("/login", login);

module.exports = router;
