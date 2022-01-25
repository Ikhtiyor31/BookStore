import express from 'express'
import orderController from '../controllers/orderController.js'
const router = express.Router()


router.route('/order/:bookid')
    .post(orderController.createOrder)

router.route('/order/:id')
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder)
    .get(orderController.getOrderById)   


export default router;