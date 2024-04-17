const express = require("express");
const router = express.Router();

const z = require("zod");
const {User, Account} = require("../db");
const {authMiddleware} = require("../middleware");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");



const signupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()

})

router.post("/signup", async(req, res) => {    
    const body = req.body;
    const {success} = signupSchema.safeParse(body)
    if(!success){
        res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username
    })

    if(existingUser){
        res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }else{               
        const newUser = await User.create(body)

        const userId = newUser._id;

        await Account.create({
            userId,
            balance: Math.ceil(Math.random()*10000)
        })

        const token = jwt.sign({
            userId: newUser._id
        }, JWT_SECRET)

        res.json({
            message: "User created successfully",
            token
        })
        
    }    

})


const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

router.post("/signin", async(req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body)

    if(!success){
        res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token
        })
    }else{
    res.status(411).json({
        message: "Error while logging in"
    })
}
})  

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

router.put("/", authMiddleware, async(req, res) => {
    const {success} = updateSchema.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    const user = await User.findOne({
        _id: req.userId
    })

    if(user && req.body.password.length >= 6){
        const updatedUserDetails = {                        
            password: user.password || req.body.password,
            firstName: user.firstName || req.body.firstName,
            lastName: user.lastName || req.body.lastName
        }
    
        await User.updateOne({
            _id: req.userId
        }, {
            $set: {
                updatedUserDetails
            }
        })

        res.status(200).json({
            message: "Updated successfully"
        })

    }else{
        res.status(411).json({message: "Error while updating information"})
    }
})


router.get("/bulk", async(req, res) => {
    const filter = req.query.filter || ''

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map((eachUser) =>( {
                username: eachUser.username,
                firstName: eachUser.firstName,
                lastName: eachUser.lastName,
                _id: eachUser._id
        }))
    })
})

module.exports = router;
