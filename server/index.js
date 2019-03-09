const app = require('./app');
const { PORT } = require('./control/constants');

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT} `);
});
