const poolPromise = require("../config/poolPromise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let pool = await poolPromise();
    const hashedPass = await bcrypt.hash(password, 8);
    console.log(hashedPass);
    let insertqry = pool.query`INSERT INTO Users(username, email, [password]) values (${username},${email},${hashedPass})`;
    if (insertqry) {
      const token = jwt.sign({ email: email }, process.env.JWTKEY, {
        expiresIn: "12h",
      });
      return res.status(201).json({
        user: { username, email },
        message: "User added",
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let pool = await poolPromise();
    const selectqry =
      await pool.query`SELECT * FROM Users where email = ${email}`;
    console.log(selectqry);
    if (selectqry.recordset.length > 0) {
      const user = selectqry.recordset[0];

      const dbPass = await bcrypt.compare(password, user.password);
      //   console.log(dbPass);
      if (dbPass) {
        const token = jwt.sign({ email: email }, process.env.JWTKEY, {
          expiresIn: "12h",
        });
        return res.status(203).json({
          user: email,
          messaged: "logged in",
          token,
        });
      } else {
        return res.status(401).json({
          message: "invalid credentials",
        });
      }
    }
    return res.status(401).json({
      message: "invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { Register, Login };
