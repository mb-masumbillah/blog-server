import { IUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
    isBlocked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook : we will save to data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  //   console.log(doc);
  doc.password = ' ';
  next();
});

userSchema.statics.isExistingUser = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>('User', userSchema);
