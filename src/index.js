console.log("Trying to load dotenv...");
console.log(require.resolve("dotenv"));  // <-- will crash if not found
require('dotenv').config();

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
