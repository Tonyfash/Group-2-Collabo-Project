const userModel = require('../models/user')

exports.createUser = async (req, res) => {
  try {
    const { userName, email, phoneNumber, gender } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `User with the email: ${email} already exist`
      })
    }


    if (!req.body.phoneNumber || req.body.phoneNumber.length !== 11) {
      return res.status(400).json({
        message: "Invalid phone number"
      });
    }

    const checkPhoneNumber = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (checkPhoneNumber) {
      return res.status(400).json({
        message: "Phone number already exists"
      });
    }

    const user = new userModel({
      userName,
      email,
      phoneNumber,
      gender
    });

    await user.save();
    res.status(201).json({
      message: `User created successfully`,
      data: user
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      message: `All users below`,
      total: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id)

    if (!user) {
      return res.status(404).json({
        message: `User with the ID: ${id} not found`
      })
    }
    res.status(200).json({
      message: `User with the ID: ${id} found`,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};
exports.updateUser = async (req, res) => {
  try {
    const {id: _id} = req.params;
    const {userName, email, phoneNumber, gender} = req.body;
    const user = await userModel.findById(_id);
    if(!user){
      res.status(404).json({
        message: `User with ${_id} not found`
      })
    } else {
      let data = {userName, email, phoneNumber, gender}
      const updatedUser = await userModel.findByIdAndUpdate(_id, data, {new: true});
      res.status(200).json({
        message: `User updated successfully`,
        data: updatedUser
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

exports.clearDb = async (req, res) => {
  try {
    const db = await userModel.deleteMany({})
    if (db.deletedCount === 0) {
      return res.status(400).json(`This database is empty`)
    }

    res.status(200).json({
      message: `Database cleared`,
      data_deleted: db.deletedCount
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

exports.deleteAuser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOneAndDelete()

    if (!user) {
      return res.status(404).json(`User with the ID: ${id} not found`)
    }

    res.status(200).json({
      message: `User deleted successfully`,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};
