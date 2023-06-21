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
      res.send({ status, statusText });
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendEmailEndpoint
};
