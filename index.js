const express = require('express');
const mongoose = require('mongoose');
const logs = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const { addUser } = require('./middleware/user');
const { getAllPosts } = require('./middleware/post');

mongoose.connect('mongodb://localhost:27017/vacobuilt', { useNewUrlParser: true });
const dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'connection error: '));
dbConnection.once('open', function () {
  console.log('DB connection successful!');
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.post('/user', async (req, res) => addUser(req, res));

app.get('/posts', (req, res) => getAllPosts(req, res));
app.get('/posts/:postId', (req, res) => getPostById(req, res));
app.get('/categories', (req, res) => getCategories(req, res));

app.post('/posts', (req, res) => createPost(req, res));

app.put('/posts/:postId', (req, res) => createPost(req, res));

app.delete('/posts', (req, res) => deletePosts(req, res));
app.delete('/posts/:postId', (req, res) => deletePostById(req, res));

app.use(logs('dev'));

app.listen(3333, () => {
  console.log(`\nWAITING FOR ACTION ON PORT ${3333}.`);
})