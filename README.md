# EZMailer
EZMailer is a self-hosted microservice for programmatic sending of email templates. Templating is powered by [Handlebars.js](https://github.com/handlebars-lang/handlebars.js/). Additionally included is email tracking and mailing lists. EZMailer can easily be consumed by TypeScript (or js...) clients using the [EZMailer Client](https://github.com/henrywalters/ezmailer-client)

If the following applies to you, EZMailer might be a good option

1) You have access to an SMTP server
2) You have the need to programmatically trigger emails to be sent
3) You have the need to use templated emails with dynamic context
4) Control is important to you
5) You don't want to spend money on a paid service, e.g., SendGrid (which works wonderfully)

The inspiration for EZMailer came after writing the same code in multiple websites to handle the exact same thing: triggering email templates with some dynamic context to be sent from some web service.