//Initializing server
import {createServer} from "./app.js";
const appName = "Server API"; 
const port = process.env.PORT || 8080;
const server = createServer();
server.listen(port, () => console.log(`${appName} running on port ${port}!`));

