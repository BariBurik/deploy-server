import express from 'express'
import cors from 'cors'
import path from 'path'
import router from './router/index.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || config.get('serverPort') 

const app = express()
const corsOptions ={
    origin:'http://87.228.8.200/',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.resolve('static')))
app.use('/api', router)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()