# Octobiwan

<img src="https://octodex.github.com/images/octobiwan.jpg" alt="octobiwan" height="300"><br/>
The [Octobi Wan Catnobi](https://octodex.github.com/octobiwan) by
[Cameron McEfee](https://github.com/cameronmcefee)

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

#### Querystring parameters

##### `slackHook={Webhook URL}`

The url to your Slack Incoming WebHook. Should be the `Webhook URL` value from
the configuration screen in Slack.

##### `botName={name}`

Override the bot name configured in Slack.

##### `botIcon={url-to-64x64-icon}`

Override the bot icon configured in Slack.

##### `channel={channel}`

Override the channel the bot should post to.

#### Supported events:

_Only listing implemented or partially implemented events_

**Issues**

| Event        | Support            |
| ------------ | ------------------ |
| Opened       | :white_check_mark: |
| Closed       | :white_check_mark: |
| Reopened     | :white_check_mark: |
| Assigned     | :no_entry:         |
| Unassigned   | :no_entry:         |
| Labeled      | :no_entry:         |
| Unlabeled    | :no_entry:         |
| Milestoned   | :no_entry:         |
| Demilestoned | :no_entry:         |

**Pull request**

| Event                  | Support            |
| ---------------------- | ------------------ |
| Opened                 | :white_check_mark: |
| Closed                 | :white_check_mark: |
| Reopened               | :white_check_mark: |
| Edited                 | :white_check_mark: |
| Assigned               | :no_entry:         |
| Unassigned             | :no_entry:         |
| Review requested       | :no_entry:         |
| Review request removed | :no_entry:         |
| Labeled                | :no_entry:         |
| Unlabeled              | :no_entry:         |
| Synchronized           | :no_entry:         |

**Pull request review**

| Event     | Support            |
| --------- | ------------------ |
| Submitted | :white_check_mark: |
| Edited    | :white_check_mark: |
| Dismissed | :white_check_mark: |

**Pull request review comment**

| Event   | Support            |
| ------- | ------------------ |
| Created | :white_check_mark: |
| Edited  | :white_check_mark: |
| Deleted | :white_check_mark: |

## Development

### Requirements

_Skip if you're deploying your own instance of the API_

* [Heroku account](https://signup.heroku.com/)
* Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### Local

* `npm start`

#### Heroku

**Deploying**

To initiate a deployment to Heroku:

* `npm run deploy`

**Scripts for Heroku**

These scripts are intended for Heroku

* `npm run build`
* `npm run serve` (initiated via Procfile)
