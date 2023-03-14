import express, { Request, Response, Router } from 'express';
const indexRouter: Router = express.Router();
import { auth } from '../../middleware/auth';
import User from '../../models/User';
import TodoItem from '../../models/TodoItem';

indexRouter.get('/api/index', auth, async  (req: Request, res: Response) => {
  const user: User = await User.findOne({ where: { id: req.body.userId, token: req.body.token } }) || new User();
  let items: any = [];

  let status = req.body.status;
  if(!status) status = 'ALL'

  switch (status) {
    case 'ALL':
      items = await user.getTodoItems();
      break;

    case 'COMPLETED':
      items = await TodoItem.findAll({where: { userId: req.body.userId, status: 'completed' } });
      break;

    case 'INCOMPLETED':
      items = await TodoItem.findAll({ where: { userId: req.body.userId, status: 'incompleted' } });
      break;
  }

  res.json(items);
});

export default indexRouter;