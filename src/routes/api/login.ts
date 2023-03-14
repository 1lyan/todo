import express, { Express, Request, Response, Router } from 'express';
import { compareSync } from 'bcrypt';
const loginRouter: Router = express.Router();
import User from '../../models/User';
import { generateToken } from '../../utils/authUtils';

loginRouter.post('/api/login', async (req: Request, res: Response) => {
  let user: any = {};
  try {
    user = await User.findOne({ where: { email: req.body.email } });
    if(user === null) {
      console.log('ERROR', 'User not Found')
      return res.status(404).end();
    }
  }
  catch (ex: any) {
    console.log('Crashed at login');
    return;
  }

  // comparing passwords
  const passwordIsValid = compareSync(
    req.body.password,
    user.password
  );

  // checking if password was valid and send response accordingly
  if (!passwordIsValid) {
    return res.status(404).end();
  }

  const token = generateToken(user.id);
  user.token = token;
  await user.save();
  res.json({
    token,
    userId: user.id
  });

});

export default loginRouter;