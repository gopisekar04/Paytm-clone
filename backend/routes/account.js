const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")
const router = express.Router()


router.get("/balance", authMiddleware, async(req, res) => {
    const userId = req.userId

    const balance = await Account.findOne({
        userId
    }, {balance: 1})

    res.status(200).json({
        balance
    })
})

router.post("/transfer", authMiddleware, async(req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to, amount} = req.body;

    const fromAccount = await Account.findOne({userId: req.userId}).session(session);

    if(!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction();
        res.status(400).json({message: "Insufficiant funds"});
    }else{
        const toAccount = await Account.findOne({userId: to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            res.status(400).json({message: "Invalid Account"});
        }

        await Account.updateOne({userId: req.userId}, {"$inc": {balance: -amount}}).session(session)
        await Account.updateOne({userId: to}, {"$inc": {balance: amount}}).session(session)

        await session.commitTransaction();
        res.status(200).json({message: "Transfer Successful"})

        }

    
}
)

module.exports = router;