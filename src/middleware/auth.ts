import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { loadEnv, env } from '../env';
import  {  Request, Response, } from 'express';
import User from '../models/User';

loadEnv();

export const auth = async (req: Request, res: Response, next: any) => {
  // get the token from the header if present
  const userId = req.body.userId;
  const token = req.body.token;
  // if no token found, return response (without going to the next middelware)
  if (!userId || !token) return res.status(404).end();

  try {
    const decoded: any = verify(token, env.JWT_PRIVATE_KEY);
    const user: User = await User.findOne({ where: { id: decoded.id, token } }) || new User();

    if(user.id === null) return res.status(404).end();

    next();
  } catch (ex) {
    // if invalid token
    console.log('User not found. Invalid token')
    return res.status(404).end();
  }
};