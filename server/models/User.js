import mongoose from 'mongoose';

const { Schema } = mongoose;

export const UserSchema = new Schema({
  firstname : { type: String, required: true },
  lastname : { type: String, required: true },
  dob : { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

export const User = mongoose.model('User', UserSchema);
