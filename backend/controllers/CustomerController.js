const Customer = require("../models/Customer");

// ADD CUSTOMER
const add = async (req, res) => {
  const { name, business, email, phone, address } = req.body;

  //check if customer exists
  const email_customer = await Customer.findOne({ email });
  const phone_customer = await Customer.findOne({ phone });

  if (email_customer) {
    res.status(409).json({ errors: ["This customer email already exist"] });
    return;
  }
  if (phone_customer) {
    res.status(409).json({ errors: ["This customer phone already exist"] });
    return;
  }

  //Add Customer
  const newCustomer = await Customer.create({
    name,
    business,
    email,
    phone,
    address,
  });

  // If Something went wrong return error
  if (!newCustomer) {
    res.status(400).json({ errors: ["Something went wrong, try again later"] });
    return;
  }

  // If customer was created successfully, return customer
  res.status(200).json(newCustomer);
};

//UPDATE CUSTOMER
const update = async (req, res) => {
  const { name, business, email, phone, address } = req.body;
  const { id } = req.params;

  try {
    //find Customer by Id
    const customer = await Customer.findById(id);

    if (customer) {
      if (name) customer.name = name;
      if (business) customer.business = business;
      if (email) customer.email = email;
      if (phone) customer.phone = phone;
      if (address) customer.address = address;

      //save
      await customer.save();
      res.status(200).json(customer);
    } else {
      res.status(422).json({
        errors: ["Customer not found or Something went wrong, try again later"],
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }

  //
  return;
};

//GET ALL CUSTOMERS
const getAll = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: "desc" });

    //check if customers exists
    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(422).json({ errors: ["Customers list empty"] });
      return;
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = {
  add,
  update,
  getAll,
};
