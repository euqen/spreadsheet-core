import logInValidator from './validators/auth.log-in.validator';
import service from './auth.service';

export default {
    logIn: (req, res) => {
        return logInValidator(req, res)
            .then(data => {
                if (data.isValid) {
                    const loggedUser = service.logIn(data);

                    res.send(loggedUser);
                }
            });
    }
}