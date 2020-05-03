const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react-sortdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Task = require('./models/task');

app.use(cors());
app.use(express.json());

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  task.sorting = await Task.estimatedDocumentCount();
  await task.save();
  res.json(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.put('/tasks', async (req, res) => {
  const tasksIds = req.body;
  for (const [i, id] of tasksIds.entries()) {
    await Task.updateOne({_id: id}, {sorting: i});
    // console.log(i, id)
  }
  res.json('the list was ordered');
});

app.listen(4000, () => {
  console.log('Server on port 4000')
})