'use strict';

const gmailApi = require('./gmailApi');

const sendEmailEndpoint = (req, res) => {
  const { name, email, content } = req.body;

  const from = {
    name: 'Liubov Rekechynska',
    email: 'bubochka102003@gmail.com'
  };

  const to = { name, email };
  const subject = 'We received your letter';
  const sentContent = `That's what you've sent us:\n${content}`;

  gmailApi.sendEmail(from, to, subject, sentContent)
    .then((result) => {
      const { status, statusText } = result;
      res.status(200).json({ status, statusText });
    })
    .catch((error) => {
      res.status(500);
      console.error(error);
    });
};

module.exports = {
  sendEmailEndpoint
};
