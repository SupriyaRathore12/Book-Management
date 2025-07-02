const router = require("express").Router();
const {
  addUsers,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

const {
  addProducts,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addToCart,
  getCart,
  clearCart,
  updateCart,
  removeItemFromcart,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authmiddleware");

router.get("/", (req, res) => {
  res.send("Hello From  Server");
});

// User
router.post("/addUser", addUsers);
router.get("/getAllUsers", authMiddleware, getUsers);
router.put("/updateuser/:id", authMiddleware, updateUser);
router.delete("/deleteUser/:id", authMiddleware, deleteUser);
router.post("/login", loginUser);

// Products
router.post("/addProducts", authMiddleware, addProducts);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.get("/getProductsByQuery", getProductsByQuery);
router.put("/updateProduct/:id", authMiddleware, updateProduct);
router.delete("/deleteProduct/:id", authMiddleware, deleteProduct);

// Cart
router.post("/addToCart", authMiddleware, addToCart);
router.get("/getCart", authMiddleware, getCart);
router.put("/updateCart", authMiddleware, updateCart);
router.delete("/removeItem/:productId", authMiddleware, removeItemFromcart);
router.delete("/clearCart", authMiddleware, clearCart);

module.exports = router;
