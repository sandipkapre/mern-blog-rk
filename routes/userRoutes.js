const { getAllUsers, getAllUsersDelete } = require("../controllers/userControllers")

const router = require("express").Router()

   router 
       .get("/", getAllUsers)
       .delete("/destroy", getAllUsersDelete)


module.exports = router