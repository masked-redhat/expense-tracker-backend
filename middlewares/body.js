import ReqBody from "../utils/request.js";

const handleBody = (req, _, next) => {
  req.body = new ReqBody(req.body);
  req.params = new ReqBody(req.params);
  req.query = new ReqBody(req.query);
  next();
};

export default handleBody;
