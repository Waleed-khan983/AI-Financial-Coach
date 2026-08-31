import Budget from "../models/Budget.js";


export const createBudget = async (req, res, next) => {
    try{

        const {month, year, totalBudget, categories} = req.body;
        const userId = req.user._id;


        if(
            month == undefined ||
            year == undefined  ||
            totalBudget == undefined
            
            ){
            return res.status(400).json({
                success:false,
                message: "month, year, and totalBudget are required.",
                status: 400
            });

        }

        const existingBudget = await Budget.findOne({
            userId: userId,
            month,
            year,
        });

        if(existingBudget){
            return res.status(409).json({
                success: false,
                message: "Budget already exists for this month and year.",
                status: 409
            });


        }


        const budget = await Budget.create({
            userId,
            month,
            year,
            totalBudget,
            categories
        });

        return res.status(201).json({
            success: true,
            message: "Budget created successfully.",
            budget,
            status: 201,

        });


    }catch(err){
        next(err)
    }
};

// Get ALL Budgets


export const getAllBudgets = async (req, res, next) =>{
    try{

        const {
            year,
            page = 1,
            limit = 12,

        } = req.query;

        const query = {
            userId: req.user._id,
        };


        if(year) {
            query.year = Number(year);
        }

        const pageNumber = Math.max(
            Number(page) || 1,
            1
        );

        const limitNumber = Math.min(
            Math.max(Number(limit) || 12, 1),
            100
        );

        const skip = (pageNumber - 1) * limitNumber;

        const budgets = await Budget
        .find(query)
        .sort({
            year: -1,
            month: -1,
        })
        .skip(skip)
        .limit(limitNumber);

        const totalBudgets = await Budget.countDocuments(query);

        const totalPages = Math.ceil(
            totalBudgets / limitNumber
        );


        return res.status(200).json({
            success: true,
            message: "Budget retrieved successfully.",

            count: budgets.length,
            pagination: {
                currentPage: pageNumber,
                totalpPages,
                totalBudgets,
                limit: limitNumber
            },
            budgets,
            status: 200,
        });





    }catch(err){
        next(err)
    }

};


// Get Budget By ID


export const getBudgetById = async (req, res, next) =>{ 
    try{

        const {id} = req.params;

        const budget = await Budget.findOne({
            _id: id,
            userId: req.user._id,
        });

        if(!budget){
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
                status: 404,
            });

        }

        return res.status(200).json({
            success: true,
            message: "Budget retrieved successfully.",
            budget,
            status: 200,
        });



    }catch(err){
        next(err)
    }
};


// Update Budget 

export const updateBudget = async (req, res, next) => {
    try{

        const {id} = req.params;

        const {
            month,
            year,
            totalBudget,
            categories,
        } = req.body;


        const updateData = {};

        if(month !== undefined){
            updateData.month = month;
        }

        if(year !== undefined){
            updateData.year = year;
        }

        if(totalBudget !== undefined) {
            updateData.totalBudget = totalBudget;
        }

        if (categories !== undefined) {
            updateData.categories = categories;
        }

        const updatedBudget = await Budget.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id,
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if(!updatedBudget){
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
                status: 404,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Budget updated successfully.",
            updatedBudget,
            status: 200,
        });


    }catch(err){
        next(err)
    }
};

// Delete Budget 

export const deleteBudget = async (req, res, next) => {
    try{

        const {id} = req.params;

        const deletedBudget = await Budget.findOneAndDelete({
            _id: id,
            userId: req.user._id,
        });

        if(!deletedBudget){
            return res.status(404).json({
                success: false,
                message: "Budget not found.",
                status: 404,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Budget deleted successfully.",
            deletedBudget,
            status: 200,
        });

    }catch(err){
        next(err)
    }
};