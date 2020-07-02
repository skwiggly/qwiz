const agentRoutes = (app, fs) => {
    const dataPath = './data/agents.json';

    // GET AGENTS LIST
    app.get('/agents', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            res.send(JSON.parse(data));
        })
    })

    // GET AGENT DETAIL
    app.get('/agent/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            const agent = JSON.parse(data).filter(d => d._id == req.params.id);
            res.send(agent);
        });
    });

    // CREATE NEW AGENT
    app.post('/agents', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            // load agents and parse to array
            const agents = JSON.parse(data);

            // add new agent to data array
            agents.push(req.body);

            // format data for POST
            const fileData = JSON.stringify(agents, null, 2);
            
            fs.writeFile(dataPath, fileData, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('New agent added.');   
            });
        });
        
    });

    // UPDATE AGENT
    app.put('/agent/:id', (req, res) => {
        // check for agent ID
        if(!req.body._id) {
            res.send('Agent ID missing');
        }

        fs.readFile(dataPath, 'utf8', (err, data) => {
            // load agents and parse to array
            const agents = JSON.parse(data);
            
            // get agent ID from request; find in array by index; update array w/ request
            const uID = req.params.id;
            const idx = agents.findIndex((o => o._id == uID));
            agents[idx] = req.body;
            
            // format data for POST
            const fileData = JSON.stringify(agents, null, 2);
            
            fs.writeFile(dataPath, fileData, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('Agent ID: ' + uID + ' updated.');   
            });
        });        
    });
};

module.exports = agentRoutes;