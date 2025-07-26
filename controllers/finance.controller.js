import Finance from "../models/finance.model.js";

export const getAllFinances = async (req, res, next) => {
  try {
    const finances = await Finance.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      message: "Finances fetched successfully",
      data: finances,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getFinance = async (req, res, next) => {
  try {
    const finance = await Finance.findById(req.params.id).populate("user");
    if (!finance) {
      return res.status(404).json({
        success: false,
        message: "Finance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Finance record fetched successfully",
      data: finance,
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFinance = async (req, res, next) => {
  try {
    const { date, amount, description} = req.body;

    // Extract month and year from date
    const expenseDate = new Date(date);
    const month = expenseDate.toLocaleString("default", { month: "long" });
    const year = expenseDate.getFullYear();

    // Build the new expenditure
    const newExpenditure = {
      date: expenseDate,
      amount,
      description,
      
    };

    // Check if a finance doc exists for the user/month/year
    let finance = await Finance.findOne({
      createdBy: req.user._id,
      month,
      year,
    });

    if (finance) {
      // Add expenditure to existing finance doc
      finance.expenditures.push(newExpenditure);
      await finance.save();
      res.status(200).json({
        success: true,
        message: "Expenditure added to existing finance record",
        data: finance,
      });
    } else {
      // Create a new finance record
      finance = await Finance.create({
        month,
        year,
        budget: req.body.budget || 0, // Set initial budget if provided
        expenditures: [newExpenditure],
        createdBy: req.user._id,
      });

      res.status(201).json({
        success: true,
        message: "New finance record created",
        data: finance,
      });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateFinance = async (req, res, next) => {
  try {
    const finance = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!finance) {
      return res.status(404).json({
        success: false,
        message: "Finance record not found",
      });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFinance = async (req, res, next) => {
  try {
    const finance = await Finance.findByIdAndDelete(req.params.id);
    if (!finance) {
      return res.status(404).json({
        success: false,
        message: "Finance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Finance record deleted successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
