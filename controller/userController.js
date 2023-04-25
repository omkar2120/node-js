const User = require("../model/userSchema");

const UserRegister = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneno } = req.body;
    const userRegister = await User.create({
      firstname,
      lastname,
      email,
      phoneno,
      status: true,
    });
    if (userRegister) {
      res.status(200).json({
        message: "User register succesfully",
        data: userRegister,
      });
    } else {
      throw new Error("User not created");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const findById = await User.findOne({ _id: id });
    if (findById) {
      res.status(200).json({
        message: "Data fetched succesfully",
        data: findById,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.body;
    const { firstname, lastname, email, phoneno } = req.body;
    const updateuser = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        lastname,
        email,
        phoneno,
      },
      { new: true }
    );
    if (updateuser) {
      res.status(200).json({
        message: "User updated succesfully",
        data: updateuser,
      });
    } else {
      throw new Error("Failed to update data");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const { id } = req.body;
    //if you want desible but not from table so update its status
    //and if you delete it from database use findByIdAndDelete
    const deleteData = await User.findOneAndUpdate(
      { _id: id },
      {
        status: false,
      },
      { new: true }
    );
    if (deleteData) {
      res.status(200).json({
        message: "User deleted succesfully",
        data: deleteData,
      });
    } else {
      throw new Error("Failed to update data");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllUserListSearch = async (req, res) => {
  try {
    let { pageNo, size, search } = req.body;
    if (pageNo < 0 || pageNo === 0) {
      response = {
        error: true,
        message: "Invalid page number, should start with 1",
      };
      return res.json(response);
    }
    const query = {};
    query.skip = size * (pageNo - 1);
    query.limit = size;

    let totalCount = await User.find({ status: true })
      .select({ _id: 1 })
      .count();
    User.aggregate([
      {
        $match: { status: true },
      },
      {
        $project: {
          firstname: "$firstname",
          lastname: "$lastname",
          email: "$email",
          phoneno: "$phoneno",
          status: "$status",
        },
      },
      {
        $match: {
          $or: [
            { firstname: { $regex: search, $options: "i" } },
            { lastname: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        },
      },
      { $skip: query.skip },
      { $limit: query.limit },
    ])
      .read("secondary")
      .exec(async (err, data) => {
        if (err) {
          throw err;
        } else {
          var totalPages = Math.ceil(totalCount / size);
          response = {
            message: "data fatch successfully",
            status: 1,
            pages: totalPages,
            total: totalCount,
            size: size,
            data: data,
          };
          res.json(response);
        }
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  UserRegister,
  findUserById,
  updateUser,
  deleteUserData,
  getAllUserListSearch,
};
