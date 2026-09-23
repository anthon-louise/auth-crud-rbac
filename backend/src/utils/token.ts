import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET as string;


export const signToken = (payload: {id: number, role: string}) => {
  return jwt.sign(payload, jwtSecret, {expiresIn: "2d"})
}

