import logInValidator from './validators/auth.log-in.validator';
import service from './auth.service';

class AuthController {
    logIn(req, res) {
        return logInValidator(req, res)
            .then(data => {
                if (data.isValid) {
                   const token = service.generateSecureToken(data.result);

                   res.send(token);
                }
            });
    }
}

export default new AuthController();