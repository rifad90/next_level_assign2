import express, { type Application, type Request, type Response } from 'express'
import { userRouter } from './modeule/users/user.route';
import { authRouter } from './modeule/auth/auth.route';
import { issuesRouter } from './modeule/issues/issues.route';
import auth from './middleware/auth';


const app: Application = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.use('/api/auth', userRouter);
//app.use('/api/auth', authRouter);
app.use('/api/issues', auth(), issuesRouter);

export default app;
