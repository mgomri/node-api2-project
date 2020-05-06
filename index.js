const express = require ('express');
const server = express();
server.use(express.json());
const pRoutes = require('./routes/pRoutes');

const port = 4000;

server.get('/', (req, res) => {
    res.send('<h2>Node Api2 Project</h2>')
});
server.use('/', pRoutes);
server.use('/api/posts', pRoutes);
server.use('/api/posts/:id', pRoutes);
server.use('/api/posts/:id/comments', pRoutes);


server.listen(4000, () => console.log(`API is up and running on port ${port}`));