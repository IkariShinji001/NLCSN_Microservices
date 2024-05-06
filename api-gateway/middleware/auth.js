const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, "Doremon");
    req.user = decoded;
    next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.cookies)
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Xác thực token
    const decoded = jwt.verify(token, "Doremon");
    req.user = decoded;

    if (req.user && req.user.role === "manager") {
      next();
    }else{
      return res.status(403).json({ message: " Khong co quyen" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};



module.exports = {
  authenticate,
  isAdmin,
};
