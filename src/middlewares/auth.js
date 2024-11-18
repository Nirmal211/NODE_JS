const adminAuth = (req, res, next) => {
  // Logic of checking if the request is authorized
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("admin is not authorized");
  } else {
    next();
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { JWTToken } = req.cookies; // Extract token from cookies
    if (!JWTToken) {
      return res.status(401).json({ error: "User authentication token missing" });
    }

    // const secretKey = process.env.JWT_SECRET; // Use environment variable
    const secretKey = "GOOGLE$7000&0216" // Please un comment your above line and put secret in .env
    const decoded = jwt.verify(JWTToken, secretKey); // Verify the JWT token
    req.user = decoded; // Attach decoded user 

    next();
  } catch (error) {
    console.error("Error in userAuth:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
