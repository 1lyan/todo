import express, { Request, Response, Router } from 'express';
const signupRouter: Router = express.Router();
import User from '../../models/User';
import { hashPassword } from '../../utils/authUtils';

signupRouter.post('/api/signup', async  (req: Request, res: Response) => {
  try {
    const user = User.build({
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password // setting unencrypted password here to do validation
    });

    await user.validate();

    // reset the password here with an encrypted version
    user.password = hashPassword(req.body.password);
    await user.save();
    return res.status(200).end();
  } catch(e:any) {
    console.log('Error at signup', e.message)
    return res.status(500).end();
  }
});

export default signupRouter;