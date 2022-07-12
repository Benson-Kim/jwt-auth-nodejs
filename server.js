const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const { userRouter } = require("./routes/userRoutes");
const { postsRouter } = require("./routes/postRoutes");

app.use("/users", userRouter);
app.use("/posts", postsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
