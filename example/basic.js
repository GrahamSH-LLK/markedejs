var http = require('http');
var markedejs = require('markedejs');
markedejs.DEBUG = true;

var PORT = 3000;
var IP = 'localhost';

function requestHandler (req, res) {
    console.log('Request for path: ' + req.url);

    /** Define locals to be passed into the sample template */
    var locals = {
        title: 'TestTemplate',
        header: 'Markdown Is Awesome!!',
        supplies: ['mop', 'broom', 'dustpan'],
        footer: 'This is some footer text',
        showFooter: false,
        user: {
            username: 'SomeUser',
            name: 'you',
            stars: 64
        },
        site: {
            title: 'markedejs',
            description: 'Render markdown templates with EJS.'
        },
        author: {
                name: 'Cory Gross',
                email: 'CoryG89@gmail.com',
                url: 'http://coryg89.github.io'
        },

        /** This line is needed to point EJS at your views directory in order
            to support compile time includes */
        filename: __dirname + '/views/*.md'
    };

    function renderHTML (err, html) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('HTML successfully rendered, sending response..');
            res.writeHead(200, {
                'Content-Length': html.length,
                'Content-Type': 'text/html'
            });
            res.write(html);
            res.end();
        }
    }

    markedejs.renderFile(__dirname + '/views/simple.md', locals, renderHTML); 
}

http.createServer(requestHandler).listen(PORT, IP, function () {
    console.log('HTTP server created, listening on ' + IP + ':' + PORT);
});