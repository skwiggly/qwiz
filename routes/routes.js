const agentRoutes = require('./agents');
const customerRoutes = require('./customers');

const appRouter = (app, fs) => {
    app.get('/', function(req, res) {
        res.send('API Ready.');
    });

    agentRoutes(app, fs);
    customerRoutes(app, fs);
};

module.exports = appRouter;