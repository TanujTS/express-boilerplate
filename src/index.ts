import express from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/error-handler";
import userRouter from '@repo/routes/user-routes'
import { toNodeHandler } from "better-auth/node";
import { auth } from "@repo/lib/auth";
import httpLogger from "./logger";
import { authLimiter, globalLimiter } from "./utils/api-limiter";

const allowedOrigins = [process.env.WEB_URL] //add other origins here

//app init
const app = express();
const port = process.env.PORT || 8000
app.get('/health', (req, res) => {
    res.send("Healthy")
})
app.use(cors({
    origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    credentials: true
}))

app.use(httpLogger);
app.use(globalLimiter);

app.use('/api/auth', authLimiter);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());

//routes
app.use('/user', userRouter)



app.use(errorHandler)

//listener
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})
