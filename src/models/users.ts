import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        is_admin: {
            type: Boolean,
            default: false,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    },
);

export default mongoose.model('users', UserSchema);
