export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400 || err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({
      message: err.message,
      list: err.errors.map((error) => error.msg),
    });
  } else if (err instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "You've sent a wrong _id in request params" });
  } else {
    next(err);
  }
}; // 400

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ success: false, message: err.messsage });
  } else {
    next(err);
  }
}; // 404

export const genericErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    message: "An error occured on our side! We're gonna fix that asap!",
  });
}; // 500
