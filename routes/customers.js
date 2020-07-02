const customerRoutes = (app, fs) => {
    const dataPath = './data/customers.json';

    // GET ALL CUSTOMERS
    app.get('/customers', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            res.send(JSON.parse(data));
        });
    });

    // GET CUSTOMERS FOR AGENT 
    app.get('/agents/:aID/customers', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            // filter data by Agent ID
            const customers = JSON.parse(data).filter(d => d.agent_id == req.params.aID);

            // map only fields that are needed; parse address data
            let filtered = customers.map((item) => {
                let address = item.address.split(', ');
                return {
                    customerID: item._id,
                    agentID: item.agent_id,
                    firstName: item.name.first,
                    lastName: item.name.last,
                    city: address[1],
                    state: address[2]
                }
            });                
            res.send(filtered);
        });
    });

    // GET CUSTOMER DETAIL
    app.get('/customer/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            // filter data by Customer ID
            const customer = JSON.parse(data).filter(d => d._id == req.params.id);
            res.send(customer);
        });
    });

    // CREATE NEW CUSTOMER
    app.post('/customers', (req, res) => {
        // check for Agent ID (and other mandatory fields)
        if(!req.body.agent_id) {
            res.send('Agent ID missing');
        }

        fs.readFile(dataPath, 'utf8', (err, data) => {
            // load customers and parse to array
            const customers = JSON.parse(data);

            // add new customer to data array
            customers.push(req.body);

            // format data for POST
            const fileData = JSON.stringify(customers, null, 2);
            
            fs.writeFile(dataPath, fileData, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('New customer added.');   
            });
        });        
    });

    // UPDATE CUSTOMER
    app.put('/customer/:id', (req, res) => {
        // check for Customer ID
        if(!req.body._id) {
            res.send('Customer ID missing');
        }

        fs.readFile(dataPath, 'utf8', (err, data) => {
            // load customers and parse to array
            const customers = JSON.parse(data);
            
            // get customers ID from request; find in array by index; update array w/ request
            const uID = req.params.id;
            const idx = customers.findIndex((o => o._id == uID));
            customers[idx] = req.body;
            
            // format data for POST
            const fileData = JSON.stringify(customers, null, 2);
            
            fs.writeFile(dataPath, fileData, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('Customer ID: ' + uID + ' updated.');   
            });
        });        
    });

    // DELETE CUSTOMER
    app.delete('/customer/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            // load customers and parse to array
            let customers = JSON.parse(data);
            
            // get customers ID from request; 
            const uID = parseInt(req.params.id);
            // filter array in place to delete customer
            customers = customers.filter(d => d._id !== uID);
            
            // format data for POST
            const fileData = JSON.stringify(customers, null, 2);
            
            fs.writeFile(dataPath, fileData, 'utf8', (err) => {
                if (err) {
                    throw err;
                }
                res.status(200).send('Customer ID: ' + uID + ' deleted.');   
            });
        });  
    });
};

module.exports = customerRoutes;