const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/roleMiddleware");
const {
    getAllUsers,
    updateUserRole,
} = require("../controllers/userController");

// Admin routes only
router.get("/", auth, isAdmin, getAllUsers); // GET /api/users
router.patch("/:userId/role", auth, isAdmin, updateUserRole); // PATCH /api/users/:userId/role

module.exports = router;
