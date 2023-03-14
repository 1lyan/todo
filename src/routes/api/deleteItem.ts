import express, { Request, Response, Router } from 'express';
const deleteItemRouter: Router = express.Router();
import TodoItem from '../../models/TodoItem';
import { auth } from '../../middleware/auth';

deleteItemRouter.delete('/api/delete_item/:itemId', auth, async  (req: Request, res: Response) => {
  try {
    const id = req.params.itemId;
    const userId = req.body.userId;

    const result = await TodoItem.destroy(
      {
        where: { id, userId },
      }
    );
    res.json(result);
  }
  catch(ex: any) {
    console.log('Error deleting item', ex.message);
    return res.status(500).end();
  }
});

export default deleteItemRouter;
