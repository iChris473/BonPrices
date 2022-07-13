
const router = require("express").Router()
const userController = require("../controllers/userController")
const agentController = require("../controllers/agentController")
const productController = require("../controllers/productController")
const auth = require("../middleware/auth")

// USER ROUTES

// create user
router.post("/user/register", userController.createUser)
// login user
router.post("/user/login", userController.loginUser)
// Update User
router.put("/user/update/:id", userController.updateUser)
// Delete user
router.delete("/user/delete/:id", userController.deleteUser)
// Get one User
router.get("/user/get/:id", userController.getOneUser)
// Get All Users
router.get("/user/all/:id", userController.getAllUsers)

// AGENT ROUTES

// AUTHENTICATE USER LOGGED IN
router.get('/auth/loggedin', agentController.verifyloggedIn)
// CREATE AGENT
router.post("/agent/create", agentController.createAgent)
// LOGIN AGENT
router.post("/agent/login", agentController.loginAgent)
// LOGOUT AGENT
router.get("/agent/token/delete", agentController.logOut)


// PRODUCT ROUTES


// CREATE PRODUCTS
router.post("/product/create", auth, productController.createProduct)
// GET AGENTS PRODUCTS
router.get("/product/agent/", auth, productController.getAgentsProduct)
// GET ONE PRODUCT
router.get("/product/get/:id", auth, productController.getOneProduct)
// UPDATE PRODUCT
router.put("/product/update/:id", auth, productController.updateProduct)
// DELTE ONE PRODUCT
router.put("/product/delete/:id", auth, productController.deleteOneProduct)



module.exports = router