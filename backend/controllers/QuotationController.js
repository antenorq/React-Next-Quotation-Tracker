const Quotation = require("../models/Quotation");
const multer = require("multer");

// ASSOCIATE FILE WITH QUOTATION
const associatefile = async (req, res) => {
  const { quotation_id, fileUrl } = req.body;

  if (quotation_id && fileUrl) {
    const quotation = await Quotation.findById(quotation_id);

    if (quotation) {
      quotation.file = fileUrl;
      //save
      await quotation.save();
      res.status(200).json({ ok: "File uploaded successfully!" });
      return;
    } else {
      res.status(400).json({ errors: ["ASSOCIATE FILE - QUOTATION NOT FOUND"] });
      return;
    }
  } else {
    res.status(400).json({ errors: ["ASSOCIATE FILE: Something went wrong, try again later"] });
    return;
  }
};

// UPLOAD ADDFILE
const addfile = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({ storage });
  console.log("aqui1");

  //UPLOAD.single = Multer Function that upload the file
  upload.single("file")(req, {}, async function (err) {
    if (!req.file) {
      return res.status(400).json({ errors: ["NO FILE UPLOADED"] });
    }

    const { quotation_id } = req.body;

    //UPDATE QUOTATION WITH THE FILENAME
    if (req.file && quotation_id) {
      console.log("aqui3");
      const quotation = await Quotation.findById(quotation_id);

      if (quotation) {
        if (req.file.filename) quotation.file = req.file.filename;
        //save
        await quotation.save();
        res.status(200).json({ file: req.file.filename, ok: "File (" + req.file.filename + ") uploaded successfully!" });
      } else {
        res.status(400).json({ errors: ["ADD FILE - QUOTATION NOT FOUND"] });
        return;
      }
    } else {
      res.status(400).json({ errors: ["ADD FILE: Something went wrong, try again later"] });
      return;
    }
  });
};

// ADD QUOTATION
const add = async (req, res) => {
  const { customerId, userId, status, quoteGiven, date, followUp, quoteDetails, location } = req.body;

  const newQuotation = await Quotation.create({
    customerId,
    userId,
    status,
    quoteGiven,
    date,
    followUp,
    quoteDetails,
    location,
  });

  // If Something went wrong return error
  if (!newQuotation) {
    res.status(400).json({ errors: ["ADD QUOTATION: Something went wrong, try again later"] });
    return;
  }

  // If quotattion was created successfully, return quotation
  res.status(200).json(newQuotation);
};

//UPDATE quotation
const update = async (req, res) => {
  const { customerId, userId, status, quoteGiven, date, followUp, quoteDetails, location } = req.body;

  const { id } = req.params;

  try {
    //find quotation by Id
    //const quotation = await Quotation.findById(id).populate("customerId").populate("userId");
    const quotation = await Quotation.findById(id);

    if (quotation) {
      if (customerId) quotation.customerId._id = customerId;
      if (userId) quotation.userId._id = userId;
      if (status) quotation.status = status;
      if (quoteGiven) quotation.quoteGiven = quoteGiven;
      if (date) quotation.date = date;
      if (followUp) quotation.followUp = followUp;
      if (quoteDetails) quotation.quoteDetails = quoteDetails;
      if (location) quotation.location = location;

      //save
      await quotation.save();
      res.status(200).json(quotation);
    } else {
      res.status(422).json({
        errors: ["Quotation not found or Something went wrong."],
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }

  //
  return;
};

//GET QUOTATION BY ID
const getQuotationById = async (req, res) => {
  const { id } = req.params;

  try {
    const quotation = await Quotation.findById(id).select("-password").populate("customerId").populate({
      path: "userId",
      select: "-password", // Exclude the password field
    });

    //check if quotation exists
    if (!quotation) {
      res.status(404).json({ errors: ["Quotation not exist"] });
      return;
    }

    res.status(200).json(quotation);
  } catch (error) {
    res.status(404).json({ errors: ["Quotation not exist or Something Went Wrong"] });
  }
};

//GET STATUS FROM USER
const getStatusByUserId = async (req, res) => {
  try {
    let quotation;
    //ADMIN
    if (req.user.type === 1) {
      quotation = await Quotation.find().populate("customerId").populate("userId");
    }
    //SALESPERSON
    if (req.user.type === 2) {
      quotation = await Quotation.find({ userId: req.user._id }).populate("customerId").populate("userId");
    }

    //check if quotation exists
    if (quotation) {
      res.status(200).json(quotation);
    } else {
      res.status(422).json({ errors: ["Quotation list empty"] });
      return;
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

//DELETE QUOTATION BY ID
const deleteQuotationById = async (req, res) => {
  const { id } = req.params;
  try {
    const quotation = await Quotation.findById(id);

    //check if quotation exists
    if (!quotation) {
      res.status(404).json({ errors: ["Quotation not exist"] });
      return;
    }

    await Quotation.findByIdAndDelete(quotation._id);

    res.status(200).json(quotation);
  } catch (error) {
    res.status(404).json({ errors: ["Quotation not exist or Something Went Wrong"] });
  }
};

//GET ALL QUOTATIONS
const getAll = async (req, res) => {
  try {
    let quotation;
    //ADMIN
    if (req.user.type === 1) {
      quotation = await Quotation.find().populate("customerId").populate("userId");
    }
    //MANAGER
    if (req.user.type === 3) {
      quotation = await Quotation.find({ location: req.user.location }).populate("customerId").populate("userId");
    }
    //SALESPERSON
    if (req.user.type === 2) {
      quotation = await Quotation.find({ userId: req.user._id }).populate("customerId").populate("userId");
    }

    //check if quotation exists
    if (quotation) {
      res.status(200).json(quotation);
    } else {
      res.status(422).json({ errors: ["Quotation list empty"] });
      return;
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = {
  associatefile,
  add,
  addfile,
  update,
  getAll,
  getQuotationById,
  deleteQuotationById,
};
