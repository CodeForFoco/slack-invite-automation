'use strict';

const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', function(req, res) {
  res.render('index', { community: config.community,
                        tokenRequired: !!config.inviteToken });
});

router.post('/invite', function(req, res) {
  if (req.body.email && (!config.inviteToken || (!!config.inviteToken && req.body.token === config.inviteToken))) {
    request.post({
        url: 'https://'+ config.slackUrl + '/api/users.admin.invite',
        form: {
          email: req.body.email,
          token: config.slacktoken,
          set_active: true
        }
      }, function(err, httpResponse, body) {
        // body looks like:
        //   {"ok":true}
        //       or
        //   {"ok":false,"error":"already_invited"}
        if (err) { return res.send('Error:' + err); }
        body = JSON.parse(body);
        if (body.ok) {
          res.render('result', {
            community: config.community,
            message: 'Success! Check "'+ req.body.email +'" for an invite from Slack.<br>' +
                     'Return to <a href="https://codeforfoco.org">'+ config.community +'</a>'
          });
        } else {
          var error = body.error;
          if (error === 'already_invited' || error === 'already_in_team') {
            res.render('result', {
              community: config.community,
              message: 'It seems like you have already been invited.<br>' +
                       'Return to <a href="https://codeforfoco.org">'+ config.community +'</a>'
            });
            return;
          } else if (error === 'invalid_email') {
            error = 'The email you entered is an invalid email.';
          } else if (error === 'invalid_auth') {
            error = 'Something has gone wrong. Please contact a system administrator.';
          }

          res.render('result', {
            community: config.community,
            message: 'Failed! ' + error,
            isFailed: true
          });
        }
      });
  } else {
    var errMsg = [];
    if (!req.body.email) {
      errMsg.push('An email address is required');
    }

    if (!!config.inviteToken) {
      if (!req.body.token) {
        errMsg.push('A valid invite token is required');
      }

      if (req.body.token && req.body.token !== config.inviteToken) {
        errMsg.push('the token you entered is wrong');
      }
    }

    res.render('result', {
      community: config.community,
      message: 'Failed! ' + errMsg.join(' and ') + '.',
      isFailed: true
    });
  }
});

module.exports = router;
