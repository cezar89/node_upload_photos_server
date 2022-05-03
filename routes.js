const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        // We must do this so the code ends here, we must not call any other res.writes and so on
        return res.end();
    }

    // Process the post message from the /message path
    if (url === '/message' && method === 'POST') {
        // We get the request data and we define the function that will process the data
        const body = [];
        // This function is registered to be executed in the future the same with 'data' and 'end'
        req.on('data', (chunk) => {
            console.log(`chunk`, chunk)
            body.push(chunk);
        });

        // This is when we finished loading all the chunks
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(`message`, message)
            // this writeFile uses event listners and it has an callback
            fs.writeFile("message.txt", message, (err) => {
                //this is the callback method and if there is an error you will get it here
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    // This is the response object. 
    // We will use it to set information to it before we send it out
    res.setHeader('Content-Type', 'text/html');
    // We can write data in chunks
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1> Hello from NodeJs server!!</h1></body>');
    res.write('</html>');

    // We must not write anything after this end
    res.end();
}

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: "some Text"
// };

// module.exports.handler = requestHandler;

exports.handler = requestHandler;
