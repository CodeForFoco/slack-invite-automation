Slack Invite Automation
------------

A tiny web application to invite a user into our slack team.

- Hosted @ [codeforfocoslack.herokuapp.com](https://codeforfocoslack.herokuapp.com/)
- Our main website connects to this API.

## Contributing Guidelines

We welcome new contributors. Not sure where to start? Check for any open [issues](https://github.com/CodeForFoco/codeforfoco.github.io/issues) or ping the team on our slack channel.

A few things to keep in mind:

- The `master` branch is production - develop on a separate branch.
- Ensure your code follows best practices and adheres to good style.

## Deploying

Pushing to master auto deploys the application.

## Configuration

fill out `config.js` as your infomation.

* `community`: your community or team name to display on join page.
* `slackUrl` : your slack team url (ex: socketio.slack.com)
* `slacktoken` : access token of slack.
  You can generate it in <https://api.slack.com/web#auth>.
  **You should generate the token in admin user, not owner.**
  If you generate the token in owner user, `missing_scope` error will be occurred.
* `inviteToken`: an optional security measure - if it is set, then that token will be required to get invited.
* `locale`: application language (currently `en` and `fr` available).

  You can test your token via curl:

  ```shell
   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
   --data 'email=EMAIL&token=TOKEN&set_active=true' \
   --compressed
  ```

## Running

[Node.js](http://nodejs.org/) is required.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ npm install
$ bin/www
```

You can access <http://localhost:3000> on your web browser.
