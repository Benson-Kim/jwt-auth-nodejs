const getPosts = (req, res, next) => {
  return res.json({
    message: "I will get all posts if the user is authorized",
  });
};

module.exports = { getPosts };
