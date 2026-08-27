import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
// create transaction

export const createTransaction = async (req, res, next) => {
    try {
        const {
            transactionType,
            transactionAmount,
            transactionCategory,
            description,
            transactionDate,
            paymentMethod,
            isRecurring,
            recurringFrequency,
            transactionNotes,

        }
            = req.body;


        if (!transactionType || !transactionAmount == undefined || !transactionCategory) {
            return res.status(400).json({
                success: false,
                message: "transactionType, transactionAmount, and transactionCategory are required",
                status: 400,
            })
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                staus: 400,
            })
        }

        await Transaction.create({
            userId: req.user._id,
            transactionType,
            transactionAmount,
            transactionCategory,
            description,
            transactionDate,
            paymentMethod,
            isRecurring,
            recurringFrequency,
            transactionNotes,
        })

        return res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            status: 200,
        })



    }
    catch (err) {
        next(err)
    }
}


// get all Transactions

export const getALLTransactions = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "User not found",
                status: 400,
            })
        }

        const transactions = await Transaction.find({ userId: req.user._id }).sort({ transactionDate: -1 });

        

        return res.status(200).json({
            success: true,
            message: "Transactions retrieved successfully",
            count: transactions.length,
            transactions,
            status: 200,
        });

    } catch (err) {
        next(err)
    }
}


// get transaction by id

export const getTransactionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "User not found",
                status: 400,
            })
        }

        const transaction = await Transaction.findOne({ _id: id, userId: req.user._id })


        if (!transaction) {
            return res.status(400).json({
                sucess: false,
                message: "Transaction not found",
                status: 400,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Transaction retrieved successfully",
            transaction,
            status: 200,
        });


    } catch (err) {
        next(err)
    }
}