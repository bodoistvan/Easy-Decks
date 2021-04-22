const Schema = require('mongoose').Schema;
const db = require('../db/index');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const flagInfo = require('./FlagInfoModel');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please tell us your name!']
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            select: false
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        },
        voices: {
          type : flagInfo.getVoiceShema(),
          required: true,
          default: {}
        },
        _subscriptions: [{
            type: Schema.Types.ObjectId,
            ref: 'Deck',
        }]
    }
);


userSchema.pre('save', async function(next) {
  
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
  });

  userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });

  userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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
  
  userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

  
const User = db.model('User', userSchema );

module.exports = User;