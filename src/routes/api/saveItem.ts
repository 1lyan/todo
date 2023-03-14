import express, { Request, Response, Router } from 'express';
const saveItemRouter: Router = express.Router();
import { auth } from '../../middleware/auth';
import TodoItem from '../../models/TodoItem';

saveItemRouter.post('/api/save_item', auth, async  (req: Request, res: Response) => {
  try {
    const result = await TodoItem.create({
      userId: req.body.userId,
      text: req.body.text,
      status: 'incompleted'
    });
    res.json(result);
  }
  catch(ex: any) {
    console.log('Error saving item', ex.message)
    return res.status(500).end();
  }
});

export default saveItemRouter;