import createValidator from './validators/user.create.validator';
import removeValidator from './validators/user.remove.validator';
import updateValidator from './validators/user.update.validator';
import service from './user.service';
import languages from './../../internal/languages';
import nodemailer from 'nodemailer';
import generatePassword from "password-generator";
import authService from './../auth/auth.service';
import smtpConfig from './../../config/smtp-config';

export default {
    create(req, res) {
        return createValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                   return;
                }

                const password = authService.generateSecurePassword();
                this.sendPasswordInMail(data.result.email, password);

                data.result.locale = languages.en;
                data.result.password = authService.generateHash(password);
                return service.create(data.result);
            });
    },

    list(req, res) {
        const query = {
            isRemoved: false
        };

        if (req.query.role) {
            query.role = req.query.role;
        }

        return service.find(query);
    },

    remove(req, res) {
        return removeValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }
                return service.updateOne({_id: data.result._id}, doc => {
                   doc.isRemoved = true;
                });
            });
    },

    current(req, res) {
        return service.findOne({email: req.user.email});
    },

    changeLocale(req, res) {
        return service.updateOne({_id: req.user._id}, doc => {
            doc.locale = req.body.locale;
        });
    },

    updateUser(req, res) {
        return updateValidator(req, res)
            .then(data => {
                if (!data.isValid) {
                    return;
                }

                return service.updateOne({_id: req.user._id}, doc => {
                    doc.firstName = data.firstName;
                    doc.middleName = data.middleName;
                    doc.lastName = data.lastName;
                    if(!req.body.group) {
                        doc.group = data.group;
                    }
                });
            });
    },

    sendPasswordInMail(to, password) {
        var smtpTransport = nodemailer.createTransport("SMTP", smtpConfig);

        smtpTransport.sendMail({
            from: "bsuir2017@gmail.com",
            to: to,
            subject: "Your password in spreadsheet system",
            text: "Your password: " + password
        }, function(){
            smtpTransport.close();
        });
    }

}