# Octobiwan

<img src="https://octodex.github.com/images/octobiwan.jpg" alt="octobiwan" height="300">
*The [Octobi Wan Catnobi](https://octodex.github.com/octobiwan) by [Cameron McEfee](https://github.com/cameronmcefee)*

> Status: Prototype, do not use

## How to use

### In Slack

1. Create an `Incoming WebHook` integration
1. Copy the `Webhook URL` value

### GitHub

1. In your GitHub repository, go to `Settings` -> `Webhooks` -> `Add webhook`
1. `Payload URL`: `{your-hosted-octobiwan-api}/github/hook?slackHook={Webhook
   URL}`
1. `Content type`: `application/json`
1. Select events to send to hook.
1. Invoke events, see that they appear in Slack, as configured in your `Incoming
   WebHook integration`. Remember that in the Webhook configuration page, at the
   bottom, you can inspect Recent Deliveries, and `Redeliver` events to replay
   them repeatedly, instead of invoking actual events in GitHub.

#### Supported events:

**Issues**

| Event        | Support            |
| ------------ | ------------------ |
| Opened       | :white_check_mark: |
| Closed       | :white_check_mark: |
| Reopened     | :white_check_mark: |
| Assigned     | :no_entry_sign:    |
| Unassigned   | :no_entry_sign:    |
| Labeled      | :no_entry_sign:    |
| Unlabeled    | :no_entry_sign:    |
| Milestoned   | :no_entry_sign:    |
| Demilestoned | :no_entry_sign:    |

**Pull request**

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
