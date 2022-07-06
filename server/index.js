import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import posts from './routers/posts.js';
import mongoose from 'mongoose';
import auth from './routers/auth.js';

const app = express();
const PORT = process.env.port || 3001; 

const URI = "mongodb://localhost:27017/blog" 
    //'mongodb+srv://admin:gNL7YFIRHyHKirr5@cluster0.1ljt2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);  
      });
  })
  .catch(err => {
    console.log('err', err)  
  })

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());



app.use('/posts', posts);
app.use('/', auth);





