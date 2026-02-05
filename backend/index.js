import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World is ready!');
});

const PORT =  8000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});