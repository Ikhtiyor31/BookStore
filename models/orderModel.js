import { connectDB } from "../database/connect";

const orderModel = {

    createOrder: async( order ) => {
        const query = connectDB('orders').insert({
            dest_address_id: order.dest_address_id,
            user_id: order.user
        });
        return query;
    },

    createOrderDetail: async( order_detail ) => {
        const query = connectDB('order_detail').insert({
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
    getOrderById: async( order ) => {

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

    cancelOrder: async( order ) => {
        
    },
    
    createAddress: async( address ) => {
        const query = connectDB('address').insert({
            street_number: address.street_number,
            street_name: address.street_name,
            cit: address.city,
            post_code: address.post_code,
            country_name: address.country_name
        });
        return query;
    },

    createPayment: async( payment ) => {
        
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