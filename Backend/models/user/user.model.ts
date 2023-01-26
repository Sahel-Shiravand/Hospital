import bcrypt from 'bcryptjs';
import mongoose, { Schema, Types } from 'mongoose';

export interface UserInterface {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: string;
  avatar: string;
  // date?: Date;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      toLower: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      // select: false,
      trim: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    avatar: {
      type: String,
      default: '',
    },
    // date: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.isPasswordMatch = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

export default User;
