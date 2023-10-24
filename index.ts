import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {

    res.send(`Server is running on http://localhost:${port}`);

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
