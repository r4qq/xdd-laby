import express from 'express';
import cors from 'cors'
import routes from './api/routes.js'

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`serwer działa na porcie: ${PORT}`)
})