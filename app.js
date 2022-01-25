

import express from "express"
import http from "http"
import session from "express-session"

import authRouter from "./routes/authRouter.js"
import bookRouter from "./routes/bookRouter.js"
import notFoundRoute from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import cors from "cors"
import redisClient from "./redis/connect.js"
import connectRedis from "connect-redis"

let RedisStore = connectRedis(session)


import dotenv from 'dotenv'
import PassportConfig from "./config/passport.js"
import passport from "passport"
dotenv.config()

const app = express()


app.use(
    session({
      store: new RedisStore({client: redisClient}),
      secret: 'bookstore_secret',
      cookie: {
          secure: false,
          httpOnly: true,
          maxAge: 2 * 60000 //2minute
      },
      resave: false,
      saveUninitialized: false,
    })
);
// to parse data from body  
app.use(express.json())
app.use(express.static("public"))

app.use(
    cors({
      origin: "http://192.168.219.108:3000",
      credentials: true,
    })
);
app.use(passport.initialize())
app.use(passport.session())

PassportConfig()

  //"http://localhost:3000"
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.219.108:3000");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    next();
});

app.use('/api', authRouter)
app.use('/api', bookRouter)

app.use(notFoundRoute)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000;
const server = http.createServer(app)

const startServer = async () => {

    try {
        server.listen(PORT, ()=> {
            console.log(`server's listening port on ${PORT}`)
        })
    } catch( error) {

    }
}

startServer()
