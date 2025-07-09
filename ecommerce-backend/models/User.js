const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // To hash password

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true, unique: true //creates a unique email address
    },
    password: { 
        type: String, required: true 
    },
    role: { 
        type: String, enum: ["customer", "admin"], default: "customer" 
    },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (raw) {
  return bcrypt.compare(raw, this.password);
};

module.exports = mongoose.model("User", UserSchema);
