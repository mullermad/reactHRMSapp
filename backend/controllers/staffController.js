const sequelize = require("../config/database.js");
const initModels = require("../models/init-models.js");
const models = initModels(sequelize);
const Staff = models.staff;

const createStaff = async (req, res) => {
  try {
    const {
      id,
      fname,
      lname,
      email,
      password,
      phone_number,
      role_id,
      department_id,
    } = req.body;
    console.log("detarmentid",department_id);

    // Check if staff with the same email already exists
    const existingStaff = await Staff.findOne({ where: { email } });
    if (existingStaff) {
      return res
        .status(400)
        .json({ error: "Staff with the same email already exists" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10)

    const newStaff = await Staff.create({
      id,
      fname,
      lname,
      email,
      password,
      phone_number,
      role_id,
      department_id,
    });

    res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ error: "Internal Server Error natty" });
  }
};

const getAllStaffs = async (req, res) => {
  try {
    const allStaff = await Staff.findAll();
    res.status(200).json(allStaff);
  } catch (error) {
    console.error("Error retrieving staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingleStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error("Error retrieving staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { fname, lname, email, password, phone_number, role_id } = req.body;

    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    await staff.update({
      id,
      fname,
      lname,
      email,
      password,
      // password: hashedPassword,
      phone_number,
      role_id,
    });

    res.status(200).json(staff);
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findByPk(id);

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    await staff.destroy();

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createStaff,
  getAllStaffs,
  getSingleStaff,
  updateStaff,
  deleteStaff,
};
