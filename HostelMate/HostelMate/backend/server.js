import express, { json } from 'express'
import dotenv from 'dotenv'
import connectToDB from './config/db.js'
import user from './models/userModel.js'
import useRouter from './routes/user.routes.js'

const app=express()

dotenv.config()
connectToDB()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server Running")
})

// app.post('/api/jokes',async (req,res)=>{

//     const {id,email,name}=req.body
    
//     const exixtingUser=await user.findOne({id}) 

//     if(exixtingUser){
//         return res.json({message:"User already exists", user:exixtingUser})
//     }

//     const newUser= await user.create({
//         id,
//         email,
//         name
//     })

//     res.json(newUser)
// })

app.use('/api',useRouter)


const port=process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`Server running at port http://localhost:${port}`)
})