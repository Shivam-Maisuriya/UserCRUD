import { User } from "../model/user.model";

const verifyUserById = async (req, res, next) => {
  try {
    console.log(req.params);
    const id = req.params.id;

    const user = await User.findById({ id: id });

    if (!user) {
      return res.status(404).json({ error: "User does not found" });
    }

    next();
  } catch (error) {
    console.log("Error in verifing user by id: ", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export default verifyUserById;
