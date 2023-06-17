const path = require('path');

const getHomePage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../frontend/pages/home.html'));
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
}

const getCatalogPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../frontend/pages/catalog.html'));
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
}

const getSearchPage = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../frontend/pages/search-results.html'));
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
}

module.exports = {
  getHomePage,
  getCatalogPage,
  getSearchPage
}