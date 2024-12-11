const usermodel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { log } = require('console');
const jwt = require('jsonwebtoken')
const zod = require("zod");



const adddatas = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        console.log(Password);

        const Validation = zod.object({
            Name: zod.string(),
            Email: zod.string(),
            Password: zod.string(),
        });

        await Validation.parse(req.body)

        const matchUser = await usermodel.findOne({ Email })
        if (matchUser) {
            return res.status(400).send ({ message: "this user already exist" })
        }

        
        const data = await bcrypt.hash(Password, 10,)
        console.log(data);

        const payload = { name: Name, pass: Password }

        const token = jwt.sign(
            payload,
            'secret', { expiresIn: '1h' })
        console.log(token, "token ")
        const adduser = await usermodel.create({
            Name: Name, 
            Email: Email,
            Password: data,
            Token: token
        });

        res.send({ status: "001", adduser })

    } catch (error) {
        res.send({ error });
        console.log(error);
    }
}

// const verification = (req, res) => {
//     try {
//         var token = req.headers.authorization.split(" ")[1];
//         console.log(token);

//         const decoded = jwt.verify(token, 'secret')

//         res.send(decoded)

//         const verifya = usermodel.find({ Name: decoded.Name })
//         console.log(verifya);

//     } catch (error) {
//         console.log(error);
//     }
// }


/////////////////////////////////////////////////////

const get = async (req, res) => {
    const postuse = await usermodel.find({})
    res.send({ status: '001', postuse })
}

////////////////////////////////Login//////////////////////////////////////////////////


const login = async (req, res , next) => {
    const { Email, Password } = req.body;
    console.log(Email,Password)

    const response = await usermodel.findOne({Email})
    if(!response){
        res.status(500).send({Message:"email is invalid"})
    }
    console.log(response)

    const isPasswordValid = await bcrypt.compare(Password,response.Password)
    if(!isPasswordValid){
        res.status(500).send({Message:"password is incorrect"})
    }

    const payload = { name: response.Name, email: response.Email }

        const token = jwt.sign(
            payload,
            'secret', { expiresIn: '1h' })
        console.log(token)
    const result = await usermodel.updateOne({Email},{Token:token})
    if(!result){
        res.status(500).send({Message:"Internal server error"}) 
    }
    else{
        res.status(200).send({status: "001", token})
    }

    // res.send({ status: "001", response })
}

//\\\\\\\\\\\\\\\\\\\\\\\\LOGOUT]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const logout = async(req,res , next)=>{
    console.log(req.user)
    const Email = req.user.email
    await usermodel.findOneAndUpdate({Email},{Token:null})
    res.send({message:"logout successfully"})    
}


const multer = (req,res)=>{
    // console.log(req)
    // console.log(req.file,"file");
    // return res.send("hello world")

    try {
        console.log(req.files)
        const filearry = req.files.map(file=>file.buffer)
         console.log(filearry);

        const {Name,Email} = req.body
        const insert = usermodel.create({
            Image:filearry,
            Name:Name,
            Email:Email
        })
        res.send({masssage:"data add"})
    } catch (error) {
        console.log(error)
    }
}

const getuserIMg = async(req,res)=>{
    try {
        const data = await usermodel.find({})
        res.send({message:"logout successfully"  , data})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = { adddatas, get, login ,logout,multer,getuserIMg}
 