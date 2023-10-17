import backend.settings as settings
from mailersend import emails


mailer = emails.NewEmail(settings.MAILERSEND_API_KEY)


def send_email(email, subject, template, **kwargs):
    mail_body = {}
    mail_from = {
        "name": "Your Name",
        "email": "your@domain.com",
    }

    recipients = [
        {
            "name": "Your Client",
            "email": "your@client.com",
        }
    ]

    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject("Hello!", mail_body)
    mailer.set_plaintext_content("This is the text content", mail_body)

    # using print() will also return status code and data
    mailer.send(mail_body)
    return {"detail": "email sent successfully"}
