// const { policyFor } = require("../../utils");
const Invoice = require("../invoice/model");
const Order = require("../order/model");

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await Invoice.find({ user: req.user._id }).countDocuments();

    let invoices = await Invoice.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt")
      .populate("order");

    return res.json({
      data: invoices,
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

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");

    // let policy = policyFor(req.user);
    // let subjectInvoice = subject("Invoice", {
    //   ...invoice,
    //   user_id: invoice.user._id,
    // });

    // if (!policy.can("read", subjectInvoice)) {
    //   return res.json({
    //     error: 1,
    //     message: "You are not allowed to access invoice",
    //   });
    // }

    if (!invoice) {
      console.log("Invoice not found");
      return res.status(404).json({
        error: 1,
        message: "Invoice not found",
      });
    }

    return res.json(invoice);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { order: order_id },
      { payment_status: "paid" },
      { new: true }
    );

    const order = await Order.findByIdAndUpdate(
      order_id,
      { status: "paid" },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        error: 1,
        message: "Invoice not found",
      });
    }

    return res.json({ updatedInvoice, order });
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

module.exports = { show, index, update };
