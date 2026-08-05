import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.ts";

//Read the token from the req
//Check if token is valid
const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    //Verify if the token is valid and extract the user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

export { authMiddleware };
