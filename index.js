const express = require ('express');

const userRoutes = require('./routes/userRoutes');
const postsRoute = require('./routes/postsRoute');

const server = express();
server.use(express.json());
const port = 4000;
server.use('/', userRoutes);
server.use('/api/posts', postsRoute);


server.listen(4000, () => console.log(`API is up and running on port ${port}`));