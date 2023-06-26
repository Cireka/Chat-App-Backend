exports.SocketHandller = (req, res, next) => {
  res.status(200).json({
    message: "Success",
  });
  next();
};
