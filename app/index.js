const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'ALVIN demo app: hello world Alvin is here another time 1st',
    version: '0.1.0',
  });
});

app.get('/health', (req, res) => {
  res.send('ok');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[ALVIN demo] listening on :${port}`));
