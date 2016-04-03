import {pageAccessMiddleware} from './../utils/extensions';

const routes = [
    '/',
    '/about',
    '/users',
    '/dashboard',
    '/registration',
    '/schedule',
    '/groups',
    '/groups/:id'
];

export default function(app) { //handle all react.js routes
    for(let route of routes) {
        app.get(route, pageAccessMiddleware, (req, res) => res.render('app.html'));
    }

    app.get(/^\/(.*\.).*$/, (req, res) => res.status(404).send()); // match static files if not exists
    app.get(/^\/(?!api\/v1\/).*$/, (req, res) => res.render('404.html')); // match all except api routes
}
