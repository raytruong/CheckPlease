import express from 'express';
const app = express();
import router from './routes';

app.use('/', router);

const port = 8080;
app.listen(port, () => {
  console.log(`serving on port ${port}`);
});
