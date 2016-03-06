export default function(controller) {
    let wrappedController = {};

    for (let key of Object.keys(controller)) {
        if (typeof controller[key] === 'function') {
            wrappedController[key] = function (req, res, next) {
                return controller[key](req, res, next)
                    .then(data => {
                        if (!res.headersSent) {
                            res.status(200).send(data || {});
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        next(error);
                    })
            }
        }
    }

    return wrappedController;
}