const routes = [
    '/',
    '/about',
    '/users'
];

export default function(app) { //handle all react.js routes
    for(let route of routes) {
        app.get(route, (req, res) => res.render('app.html'));
    }
}
