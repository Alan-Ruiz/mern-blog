const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 8000;

app.use(express.json({ extended: false }));

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('mern_blog_db');
    await operations(db);
    client.close();
  } catch (error) {
    console.error('Error connecting to DB', error);
    res.status(500).json({ message: "Error connecting to DB", error });
  }
};

app.get('/api/articles/:name', async (req, res) => {
  console.log(`Received request for article: ${req.params.name}`);
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db.collection('articles').findOne({ name: articleName });

    if (!articleInfo) {
      console.log('Article not found');
      res.status(404).json({ message: 'Article not found' });
    } else {
      console.log('Article found:', articleInfo);
      res.status(200).json(articleInfo);
    }
  }, res);
});

app.post('/api/articles/:name/add-comments', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  withDB(async (db) => {
    const articleInfo = await db.collection("articles").findOne({ name: articleName });
    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text })
        }
      }
    );
    const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get('/', (req, res) => res.send("Hello, world!"));
app.post('/', (req, res) => res.send(`Hello, ${req.body.name}!`));
app.get('/hello/:name', (req, res) => res.send(`Hello, ${req.params.name}!`));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
                    
                    
// const articlesInfo = {
//   "learn-react": {
//     "comments": []
//   },
//   "learn-node": {
//     "comments": []
//   },
//   "my-thoughts-on-learning-react": {
//     "comments": []
//   },
// }