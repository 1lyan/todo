import express, { Request, Response, Router } from 'express';
const completeItemRouter: Router = express.Router();
import { auth } from '../../middleware/auth';
import changeItemStatus from '../../services/changeItemStatus';

completeItemRouter.post('/api/complete_item', auth, async  (req: Request, res: Response) => {
  try {
    const result = await changeItemStatus(req.body, 'completed');
    res.json(result);
  }
  catch(ex: any) {
    console.log('Error completing item', ex.message)
    return res.status(500).end();
  }
});

export default completeItemRouter;