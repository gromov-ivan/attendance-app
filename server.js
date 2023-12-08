const jsonServer = import('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/generateQrCode', (req, res) => {
  const { courseName, date } = req.body;
  const expirationTime = Date.now() + 5000; // 5 seconds

  const activeQrCode = { courseName, date, expirationTime };
  res.jsonp(activeQrCode);
});

server.post('/deactivateQrCode', (req, res) => {
  res.jsonp({ success: true });
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
