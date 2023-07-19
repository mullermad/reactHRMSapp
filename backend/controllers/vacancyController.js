const sequelize = require("../config/database.js");
const initModels = require("../models/init-models.js");
const models = initModels(sequelize);
const Vacancy = models.vacancy;
const Department =models.department

// Create a vacancy
const createVacancy = async (req, res) => {
  try {
    console.log(req.body);
    // const { department_id, ...vacancyData } = req.body; // Extract departmentId from req.body
    // const department = await Department.findById(department_id); // Find the department by ID
    
    // if (!department) {
    //   return res.status(404).json({ error: 'Department not found' });
    // }
    
    const vacancy = await Vacancy.create(req.body);
    res.status(201).json(vacancy);
  } catch (error) {
    console.log(error)
  }
};


// Read all vacancies
const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();
    res.json(vacancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a specific vacancy
const getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (vacancy) {
      res.json(vacancy);
    } else {
      res.status(404).json({ error: "Vacancy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a vacancy
const updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (vacancy) {
      await vacancy.update(req.body);
      res.json(vacancy);
    } else {
      res.status(404).json({ error: "Vacancy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a vacancy
const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (vacancy) {
      await vacancy.destroy();
      res.json({ message: "Vacancy deleted successfully" });
    } else {
      res.status(404).json({ error: "Vacancy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVacancy,
  getAllVacancies,
  getVacancyById,
  updateVacancy,
  deleteVacancy,
};
