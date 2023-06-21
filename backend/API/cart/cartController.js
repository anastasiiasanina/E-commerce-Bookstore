'use strict';

const cartHelper = require('../../helpers/cartHelper');
const {
  CART_CREATE_MESSAGE,
  CART_REMOVE_MESSAGE,
  ADDED_TO_CART_MESSAGE,
  REMOVED_FROM_CART_MESSAGE,
  STATUS_OK
} = require('./cartResources');

const createCart = (req, res) => {
  cartHelper.createCart(res.cookie);

  res.status(201).json({
    status: STATUS_OK,
    message: CART_CREATE_MESSAGE
  });
};

const removeCart = (req, res) => {
  cartHelper.removeCart(res.clearCookie);

  res.status(200).json({
    status: STATUS_OK,
    message: CART_REMOVE_MESSAGE
  });
};

const addToCart = (req, res) => {
  const { productId, quantity } = req.body;

  const responseObject = {
    status: STATUS_OK,
    message: ADDED_TO_CART_MESSAGE
  };

  if (quantity === 0) {
    cartHelper.removeFromCart(res.cookie, req.cookies, productId);
    responseObject.message = REMOVED_FROM_CART_MESSAGE;
  } else {
    cartHelper.addToCart(res.cookie, req.cookies, { productId, quantity });
  }

  res.status(200).json(responseObject);
};

const removeFromCart = (req, res) => {
  const { productId } = req.body;

  cartHelper.removeFromCart(res.cookie, req.cookies, productId);

  res.status(200).json({
    status: STATUS_OK,
    message: REMOVED_FROM_CART_MESSAGE
  });
};

module.exports = {
  createCart,
  removeCart,
  addToCart,
  removeFromCart
};
