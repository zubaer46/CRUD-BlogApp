const { getNews,createNews,updateNews,deleteNews,  getNewsByUserId,getNewsById
 } = require("./news.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/",  getNews);
router.get("/user/:id",   getNewsByUserId);
router.get("/:id",   getNewsById);
router.post("/add", createNews);
router.put("/update/:id", updateNews);
router.put("/delete/:id", deleteNews);

module.exports = router;