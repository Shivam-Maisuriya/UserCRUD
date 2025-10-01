import jwt from "jsonwebtoken";

const generateTokenAndSaveCookie = (res, obj) => {
  const data = obj;

  // console.log("data: ",data)
  // console.log("obj: ",obj)
  const token = jwt.sign({ id: data._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 25 * 60 * 60 * 1000),
  });

  return token;
};

export default generateTokenAndSaveCookie;
