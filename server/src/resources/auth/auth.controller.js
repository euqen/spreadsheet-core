import logInValidator from './validators/auth.log-in.validator';
import service from './auth.service';

export default {
    logIn(req, res) {
        return logInValidator(req, res)
            .then(data => {
                if (data.isValid) {
                    const token = service.generateSecureToken(data.result);
                    req.session.token = token;

                    return {token: token};
                }
            });
    }
}