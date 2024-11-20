const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 5000


const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/clients')
const db = mongoose.connection 
db.once('open',()=>{
    console.log("Moongose connection successful");
    
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    vehicle:String,
    startDate:String, 
    endDate:String
})

const Users = mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'book-now.html'))
})

app.post('/post',async (req,res)=>{
    const{name,email,vehicle,startDate,endDate} = req.body
const user = new Users({
    name,
    email,
    vehicle,
    startDate,
    endDate
})
await user.save()
console.log(user)
res.send("Your Ride is Booked")

})

app.listen(port,()=>{
    console.log("server started")
})