import jwt from "jsonwebtoken";

export const generateToken = ({ _id, name, email }) => {
  try {
    const token = jwt.sign(
      {
        _id,
        name,
        email,
      },
      process.env.JWT_SECRETE,
      { expiresIn: "1d" },
    );

    return token;
  } catch (error) {
    console.log(`JWT token creation error: ${error}`);
    return null;
  }
};

export const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRETE);
    return user;
  } catch (error) {
    console.log(`JWT token decode error: ${error}`);
    return null;
  }
};
