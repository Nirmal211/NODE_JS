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

const userAuth = (req, res, next) => {
  // Logic of checking if the request is authorized
  const token = "xyzs";
  const isUserAuthorized = token === "xyz";
  if (!isUserAuthorized) {
    res.status(401).send("User is not authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
