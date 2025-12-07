import express from "express";
import cors from 'cors'
import { errorHandler } from "./middlewares/error-handler";
import userRouter from '@repo/routes/user-routes'

//app init
const app = express();
const port = process.env.PORT || 8000

app.use(express.json());

//routes
app.get('/health', (req, res) => {
    res.send("Healthy")
})
app.use('/user', userRouter)



app.use(errorHandler)

//listener
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})
