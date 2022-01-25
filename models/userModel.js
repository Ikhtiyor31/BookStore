
import { connectDB } from "../database/connect.js";

const userModel = {
    
    getUserByEmail: async (email) => {
        
        const query = connectDB.select(`*`)
            .from(`user`)
            .innerJoin('user_permission', function() {
                this.on(`user.user_id`, `=`, `user_permission.user_id`)
            })
            .innerJoin(`user_role`,function() {
                this.on(`user_role.role_id`, `=`, `user_permission.role_id`)
            })
            .where(`email`, `${email}`)

            console.log('query ' + query)
            return query;
    },
    getUserById: async (user_id) => {

        const query = connectDB.select(`*`)
            .from(`user`)
            .innerJoin('user_permission', function() {
                this.on(`user.user_id`, `=`, `user_permission.user_id`)
            })
            .innerJoin(`user_role`,function() {
                this.on(`user_role.role_id`, `=`, `user.user_id`)
            })
            .where(`user.user_id`, `${user_id}`)

            return query
    },
    
    createUser: async(user) => {
        const query = connectDB('user').insert({
            name: user.name,
            email: user.email,
            password: user.password
        })
        return query;
    },

    createPermission: async(user_id) => {
        const query = connectDB('user_permission').insert({
            user_id: user_id,
            role_id: 2,
        })
        return query;
    },
    deleteUser: async(user) => {
        const query = connectDB.delete().from('user').where(`email`, `=`, `${user.email}`)
        return query;
    }

}

export default userModel;