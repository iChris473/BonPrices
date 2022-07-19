
const router = require("express").Router()
const userController = require("../controllers/userController")
const agentController = require("../controllers/agentController")
const productController = require("../controllers/aproductController")
const superController = require("../controllers/superController")
const auth = require("../middleware/auth")
const superAuth = require("../middleware/superAuth")

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
router.post("/agent/create", superAuth, agentController.createAgent)
// UPDATE AGENT AGENT
router.put("/agent/update", auth, agentController.updateAgent)
// LOGIN AGENT
router.post("/agent/login", agentController.loginAgent)
// LOGOUT AGENT
router.get("/agent/token/delete", agentController.logOut)
// GET ONE AGENT
router.get("/agent/get", auth, agentController.getAgentProfile)



// PRODUCT ROUTES


// CREATE PRODUCTS
router.post("/product/create", auth, productController.createProduct)
// GET AGENTS PRODUCTS
router.get("/product/agent/", auth, productController.getAgentsProduct)
// GET ONE PRODUCT
router.get("/product/get/:id", productController.getOneProduct)
// UPDATE PRODUCT
router.put("/product/update/:id", auth, productController.updateProduct)
// DELTE ONE PRODUCT
router.delete("/product/delete/:id", auth, productController.deleteOneProduct)
// SEARCH FOR PRODUCTS 
router.get("/product/search", productController.queryProduct)
// GET SUGGESTIONS
router.get("/product/suggest/:query", productController.queryProduct)


// SUPER ADMIN ROUTES

// CREATE SUPER ADMIN
// router.post("/super/create", superController.createSuper)
// LOGIN SUPER ADMIN
router.post("/super/auth/login", superController.loginSuper)
//  SUPER ADMIN IS LOGGED IN
router.get("/super/auth/verifylog", superController.isSupperLoggedIn)
// LOGOUT SUPER ADMIN
router.get("/super/auth/logout", superController.logOut)
// GET ALL AGENTS 
router.get("/super/agent/all", superAuth, superController.getAllAgents)
// GET ONE AGENT 
router.get("/super/agent/one/:id", superAuth, superController.getOneAgent)
// UPDATE ONE AGENT
router.put("/super/agent/update/:id", superAuth, superController.updateAgent)
// GET ALL PRODUCTS
router.get("/super/product/get", superAuth, superController.getAllProducts)


module.exports = router