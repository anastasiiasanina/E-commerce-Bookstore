'use strict';

const path = require('path');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

const gmail = google.gmail('v1');

const composeMessage = (from, to, subject, content) => {
  // Encode the subject into something... uh
  // Like base64 + enclosing characters so Gmail knows what it deals with
  const transformedSubject = Buffer.from(subject).toString('base64');
  const encodedSubject = `=?utf-8?B?${transformedSubject}?=`;

  const messageParts = [
    `From: ${from.name} <${from.email}>`,
    `To: ${to.name} <${to.email}>`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${encodedSubject}`,
    '',
    ''
  ];

  const message = messageParts.join('\n') + content;

  console.log(message);

  // The body needs to be base64url encoded
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return encodedMessage;
};

const sendEmail = async (from, to, subject, content) => {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../oauth2.keys.json'),
    scopes: [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.send',
    ],
  });

  google.options({ auth });

  const message = composeMessage(from, to, subject, content);

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: message,
    },
  });

  return res.data;
};

module.exports = {
  sendEmail
};
