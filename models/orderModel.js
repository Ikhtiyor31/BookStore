import { connectDB } from "../database/connect.js";

const orderModel = {

    createOrder: async( order ) => {
        console.log(order)
        const query = connectDB('orders').insert({
            dest_address_id: order.dest_address_id,
            user_id: order.user_id
        });
        return query;
    },

    createOrderDetail: async( order_detail ) => {
 
        const query = connectDB('order_detail').insert({
            order_id: order_detail.order_id,
            status_date: order_detail.status_date,
            quantity: order_detail.quantity || 0,
            book_id: order_detail.book_id,
            total_price: order_detail.total_price,
            sub_total_price: order_detail.sub_total_price,
            order_status: order_detail.order_status,
            payment_id: order_detail.payment_id
        });
        return query;
    },
    getOrderById: async( order_id ) => {
        const query = connectDB
            .select('*')
            .from('orders')
            .innerJoin('order_detail', function() {
                this.on(`orders.order_id`, `=`, `order_detail.order_id`)
            })
            .where('orders.order_id', order_id)

        return query;
    },
    updateOrderDetail: async( order ) => {
        const query = connectDB('order_detail').update({
            status_date: order_detail.status_date,
            quantity: order_detail.quantity,
            total_price: order_detail.total_price,
            sub_total_price: order_detail.sub_total_price,
            order_status: order_detail.order_status,
            payment_id: order_detail.payment_id
        });
        return query;
    },

    cancelOrder: async( order_id ) => {
        const query = connectDB
            .delete()
            .from('orders')
            .where('order_id', `=`, order_id)
        return query; 
    },
    
    createAddress: async( address ) => {
        const query = connectDB('address').insert({
            street_number: address.street_number,
            street_name: address.street_name,
            city: address.city,
            post_code: address.post_code,
            country_name: address.country_name
        });
        return query;
    },

    createPayment: async( payment ) => {
        const query = connectDB('payments').insert({
            card_type: payment.card_type,
            card_number: payment.card_number,
            card_date: payment.card_date,
            expiry_date: payment.expiry_date
        })
        return query;
    },

    updatePayment: async ( payment ) => {

    },

    deletePayment: async ( payment_id ) => {

    },

    addToCart: async ( data ) => {

        
    },
    updateCart: async ( data ) => {

    },

    getAllFromUserCart: async (order) => {

    },

    getAllFromCurrentUserCart: async (user_id) => {

    },

    deleteFromCart: async (cart_id) => {

    },
}

export default orderModel;