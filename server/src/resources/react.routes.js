const routes = [
    '/',
    '/about',
    '/users',
    '/dashboard'
];

export default function(app) { //handle all react.js routes
    for(let route of routes) {
        app.get(route, (req, res) => res.render('app.html'));
    }
    // match all except static files and api routes
    app.get(/^\/(?!api\/v1\/)(?!.*\.).*$/, (req, res) => res.render('404.html'))
}
