import backend.settings as settings
from mailersend import emails


mailer = emails.NewEmail(settings.MAILERSEND_API_KEY)


def send_email(code, email):
    mail_body = {}
    mail_from = {
        "name": "Escrow and Trust",
        "email": "support@escrowandtrust.net",
    }

    recipients = [
        {
            "email": email,
        }
    ]
    personalization = [
        {
            "email": email,
            "data": {
                "code": code,
            }
        }
    ]

    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject("Verify Your Account!", mail_body)
    mailer.set_template("jy7zpl9n1d545vx6", mail_body)
    mailer.set_advanced_personalization(personalization, mail_body)

    mailer.send(mail_body)
    return True

