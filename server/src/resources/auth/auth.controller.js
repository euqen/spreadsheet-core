import logInValidator from './validators/auth.log-in.validator';
import service from './auth.service';
import userService from './../user/user.service';

export default {
    logIn(req, res) {
        return logInValidator(req, res)
            .then(data => {
                if (data.isValid) {
                    return userService.findOne({email: data.result.email})
                        .then((user) => {
                            const token = service.generateSecureToken(user);
                            req.session ? req.session.token = token : req.session = {token: token};

                            return {token: token};
                        });
                }
            });
    },

    logOut(req, res) {
        req.session.token = null;
        return new Promise(resolve => resolve()); //lolstuff goes here
    }
}