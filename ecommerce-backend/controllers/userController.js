const User = require("./models/User");

// Admin-only: List all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

    // Admin-only: Update a user's role
    exports.updateUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    // Ensure new role is valid
    if (!["customer", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    try {
        const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, select: "-password" }
        );
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User role updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
