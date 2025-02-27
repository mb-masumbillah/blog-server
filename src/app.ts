import express, { Application, Request, Response } from 'express';
import globalErrorHandle from './middleware/globalErrorHandle';
import notFound from './middleware/notFound';
import router from './Router';

const app: Application = express();

// perser
app.use(express.json());

// route
app.use('/api', router);

// test
app.get('/', async (req: Request, res: Response) => {
  res.send('Blog Project server');
});

// global error
app.use(globalErrorHandle);

// not Found
app.use(notFound);

export default app;
