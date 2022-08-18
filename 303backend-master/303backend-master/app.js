
const Express = require('express');
const BodyParser = require('body-parser');
const hmedt = require('./routes/hmedt');
const muser = require('./routes/muser');
const mvip = require('./routes/mvip');
const memo = require('./routes/memo_Cnt');
const hmehd = require('./routes/hmehd');
const mityp = require('./routes/mityp');
const booking = require('./routes/booking');
const cors = require('cors');
const App = Express();

App.use(cors());

App.use(BodyParser.json())
App.use(BodyParser.urlencoded());
App.use('/hmedt', hmedt)
App.use('/muser', muser)
App.use('/memo_Cnt', memo)
App.use('/hmehd', hmehd)
App.use('/mityp', mityp)
App.use('/mvip', mvip)
App.use('/booking', booking)
const port = 10888

App.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`)
})

