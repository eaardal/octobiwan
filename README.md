# Octobiwan

> Status: Prototype, do not use

## Use

### Slack

1. Create an `Incoming WebHook` integration
1. Copy the `Webhook URL` value

### GitHub

1. In your GitHub repository, go to `Settings` -> `Webhooks` -> `Add webhook`
1. `Payload URL`:
   `https://octobiwan.herokuapp.com/github/hook?slackHook={Webhook URL}`
1. `Content type`: `application/json`
1. Select events to send to hook.
1. Invoke events, see that they appear in Slack, as configured in your `Incoming
   WebHook integration`.

#### Supported events:

TBA

## Development

### Requirements

* [Heroku account](https://signup.heroku.com/)
* Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### Local

* npm start

#### Heroku

**Deploying**

* npm run deploy

**Scripts for Heroku**

* npm run build
* npm run serve (initiated via Procfile)
