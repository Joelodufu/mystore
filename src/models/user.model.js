const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image : [

    ],
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    Gender: {
      type: String,
      enum: ['male', 'female'],
    },
    userType: {
      type: String,
      enum: ["Customer", "Manager", "Admin"]
    },
 
    profileSet: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    _order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ],
    _cart:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
      }
    ],
    _favorite: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite',
    }
        ],
        _transaction: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
            required: true,
          }
        ],
    otp: {
      type: Number,
    }
  },
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;