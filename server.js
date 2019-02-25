const { env } = require('./src/utils/helpers');
const app = require('./src/app');

const port = env('PORT') || 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
