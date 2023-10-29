const app = require('./src/app');
const connection = require('./src/database/connection');

const PORT = process.env.PORT || 3001;

connection.then(() => {
  console.log('database connected');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });

  app.on('error', (e) => {
    console.log(`Error is ${e}`);
  });
});





// mongodb://mongo:yB9phzPb0Ejy0UrYV783@containers-us-west-156.railway.app:7480  


