const path = require('path');

const getHomePage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../frontend/pages/home.html'));

  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
}

module.exports = {
  getHomePage
}