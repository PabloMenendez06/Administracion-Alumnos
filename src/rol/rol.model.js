import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "The role is required"],
        unique: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    }
});

export default mongoose.model("Rol", RoleSchema);