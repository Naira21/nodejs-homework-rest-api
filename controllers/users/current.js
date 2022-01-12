export const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  return res.status(200).json({
    Status: "200 OK",
    ContentType: "application/json",
    ResponseBody: { email, subscription },
  });
};
