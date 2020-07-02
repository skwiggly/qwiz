API Exercise for QuoteWizard

I. Assumptions & Questions
    a. When creating Agent or Customer, the INT ID must be passed in request (vs auto-incremented by DB as would be typical)
    b. Mandatory data fields for create actions? ie. name, contact info, etc.
    c. Must new customers be associated to an agent initially?
    d. Discuss data set size, and how to handle large sets in UI. Ideas for performance: Paging requests, infinite scroll w/ dynamic loading, using local storage, filter initial request by date or other property
    e. Possible enhancements: consolidate fs.readFile & fs.writeFile into global helper methods; add better error handling; use local storage to minimize repeated large data loading

II. Installation
    a. Prerequisites
       1. Node.js
       2. NPM
       3. Postman
    b. Steps
       1. Copy the QW folder to your computer
       2. In your IDE/Terminal/PowerShell, navigate to the QW directory
       3. Run the command: "npm install" (the node_modules folder isn't included in the project due to size)
       4. Run the command: "npm start"
       5. Verify Node is running, look for "listening on port 2001" in IDE/Terminal console
       6. In Postman, use "http://localhost:2001/" as the base request URL, and test each API as described below 

III. API Reference

    a. Agent List 
       DESC: Returns list of all agents
       GET: /agents
       PARAMS: none
       RESPONSE: 200 list of Agent objects

    b. Agent Detail 
       DESC: Returns single agent's details
       GET: /agents/<id>
       PARAMS: INT id (Agent ID)
       RESPONSE: 200 single Agent object

    c. Add New Agent
       DESC: Add new agent
       POST: /agents
       CONTENT-TYPE: application/json
       BODY: complete Agent object
       RESPONSE: 200 New agent added.
    
    d. Update Agent
       DESC: Update agent details
       PUT: /agent/<id>
       CONTENT-TYPE: application/json
       BODY: complete Agent object
       RESPONSE: 200 Agent id: <id> updated.

    e. Agent's Customer List 
       DESC: Returns list of all customers for agent
       GET: /agents/<id>/customers
       PARAMS: none
       RESPONSE: 200 list of Customer objects
    
    f. Get Customer Detail
       DESC: Returns single customer details
       GET: /customer/<id>
       PARAMS: INT id (Customer ID)
       RESPONSE: 200 single Customer object

    g. Add New Customer 
       DESC: Add new customer for agent
       POST: /customers
       CONTENT-TYPE: application/json
       BODY: complete Customer object
       RESPONSE: 200 New customer added.

    h. Update Customer 
       DESC: Update customer details
       PUT: /customer/<id>
       CONTENT-TYPE: application/json
       PARAMS: INT id (Customer ID)
       RESPONSE: 200 CustomerID: <id> updated.
    
    i. Delete Customer 
       DESC: Delete customer 
       DELETE: /customer/<id>
       PARAMS: INT id (Customer ID)
       RESPONSE: 200 CustomerID: <id> deleted.