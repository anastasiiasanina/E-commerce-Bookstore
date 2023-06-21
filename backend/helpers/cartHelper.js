'use strict';

const cookieSettings = {
  maxAge: 6 * 60 * 60 * 1000, // 6 hours
  httpOnly: true,
};

const { CART_COOKIE_NAME } = require('../API/cart/cartResources');

const createCart = (callback) => {
  const data = '[]';
  callback(CART_COOKIE_NAME, data, cookieSettings);
};

const removeCart = (callback) => {
  callback(CART_COOKIE_NAME);
};

const addToCart = (callback, cookies, productInfo) => {
  const cartDataString = cookies[CART_COOKIE_NAME];
  const cartData = JSON.parse(cartDataString);
  cartData.append(productInfo);
  callback(CART_COOKIE_NAME, JSON.stringify(cartData), cookieSettings);
};

const removeFromCart = (callback, cookies, productId) => {
  const cartDataString = cookies[CART_COOKIE_NAME];
  const cartData = JSON.parse(cartDataString);
  const newCartData = cartData.filter((product) => product.id !== productId);
  callback(CART_COOKIE_NAME, JSON.stringify(newCartData), cookieSettings);
};

module.exports = {
  createCart,
  removeCart,
  addToCart,
  removeFromCart,
};
