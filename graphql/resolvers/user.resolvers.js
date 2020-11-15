const User = require("./../../models/user.model");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, JWT_SECRET_REFRESH } = require("./../../configs");
const JWT = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("./../../utils/validators/validators");
const refreshTokens = [];

function generateToken(user, type = ""){
  const SECRET =
    type === "access"
      ? JWT_SECRET
      : type === "refresh"
      ? JWT_SECRET_REFRESH
      : " ";
  const expiresIn =
    type === "access" ? "1hr" : type === "refresh" ? "7d" : "";
    return (
      "Bearer" +
      " " +
      JWT.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        SECRET,
        { expiresIn }
      )
    );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Input error", errors);
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "Username dosen't exist";
        throw new UserInputError("User not found", errors);
      } else {
        const match = await bcrypt.compare(password, user.password);
        errors.general = "Wrong Password";
        if (!match) {
          throw new UserInputError("Wrong Credentials", errors);
        }
      }
      const refreshToken = generateToken(user, "refresh");
      refreshTokens.push(refreshToken);
      return {
        ...user._doc,
        id: user._id,
        accessToken: generateToken(user, "access"),
        refreshToken,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", errors);
      }
      const user = await User.findOne({ username, email });
      if (user) {
        throw new UserInputError("username taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date()
      });
      try{
          const res = await newUser.save();
          return {
            ...res._doc,
            id: res._id,
            token: generateToken(res, "access"),
            refreshToken: generateToken(res, "refresh"),
          };
      }catch(errors){
          throw new Error(errors)
      }
    },
    async renewToken(_,{ refreshToken }){
      if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        throw new Error("no refresh token or BlackListed token Provided");
      }
      try{
        const user = await JWT.verify(
          refreshToken.split("Bearer ")[1],
          JWT_SECRET_REFRESH)
          if (user) {
            const accessToken = generateToken(user, "access");
            const refreshToken = generateToken(user, "refresh");
            return {
              accessToken,
              refreshToken
            }
          }
        }
         catch(err){
          throw new Error("invalid token");
        }
    }
  }
};

