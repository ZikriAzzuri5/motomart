const CartItem = require("../cart-item/model");
const Address = require("../address/model");
const Order = require("../order/model");
const { Types } = require("mongoose");
const OrderItem = require("../order-item/model");

const create = async (req, res, next) => {
  try {
    let { deliveryFee, address } = req.body;

    let items = await CartItem.find({ user: req.user._id }).populate("product");
    if (!items) {
      return res.json({
        error: 1,
        message: "You are not create order because you have not items in cart",
      });
    }

    let delivery_address = await Address.findById(address);

    let order = new Order({
      _id: new Types.ObjectId(),
      status: "waiting_payment",
      delivery_fee: deliveryFee,
      address: {
        province: delivery_address.province,
        regency: delivery_address.regency,
        subdistrict: delivery_address.subdistrict,
        ward: delivery_address.ward,
        detail: delivery_address.detail,
      },
      user: req.user._id,
    });

    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...item,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.product.price),
        order: order._id,
        product: item.product._id,
      }))
    );

    orderItems.forEach((item) => order.order_items.push(item));

    order.save();
    await CartItem.deleteMany({ user: req.user._id });
    return res.json(order);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("order_items")
      .sort("-createdAt");
    return res.json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (err) {
    if (err && err.name == "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = { create, index };
