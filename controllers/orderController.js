import { createCustomError } from "../errors/custom-error.js";
import asyncWrapper from "../middleware/async.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const orderController = {
    
    createOrder: asyncWrapper(async(req, res, next) => {
        const book_id = req.params.bookid;
        if (!book_id) {
            return next(createCustomError(`no book id provided`, 400))
        }
        // create address
        const newAddress = await orderModel.createAddress(req.body)
        if (!newAddress) {
            return next(createCustomError(`DB saving error in creating order`, 505))
        }
        const orderObj = req.body;
      
        orderObj.dest_address_id = newAddress[0];
        const email = req.session.user;
        const user = await userModel.getUserByEmail(email);
        console.log(user[0].user_id)
        orderObj.user_id = user[0].user_id;
        // create order 
        const newOrder = await orderModel.createOrder(orderObj);
        let newDate = new Date()
        //create payment
        const payment = await orderModel.createPayment(req.body);
       
        const orderDetailObj = req.body;
        orderDetailObj.book_id = book_id;
        orderDetailObj.order_id = newOrder[0];
        orderDetailObj.payment_id = payment[0];
        // finally create order detail;
        const newOrderDetail = await orderModel.createOrderDetail(orderDetailObj)

        return res.status(201).json({status: `success`, data: orderObj})
    }),
    getOrderById: asyncWrapper(async(req, res, next) => {
        const orderId = req.params.id;
        if ( !orderId ) {
            return next(createCustomError(`no id provided`, 400))
        }

        const order = await orderModel.getOrderById(orderId);
        return res.status(200).json({msg: `success`, 
            data: order});

    }),

    updateOrder: asyncWrapper(async(req, res, next) => {

    }),

    deleteOrder: asyncWrapper(async(req, res, next) => {

    }),

};

export default orderController;