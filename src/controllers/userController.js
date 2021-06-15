const User = require("../models/User");
const bcrypt = require("bcryptjs");
const commonPw = require("../utils/commonPw");

exports.registerUser = async (req, res) => {
  const datas = {
    email: req.body.email,
    password: req.body.password,
  };

  if (commonPw.includes(datas.password)) {
    res.redirect("/");
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(datas.password, salt);

  if (datas.email !== undefined && datas.password !== undefined) {
    await User.findOne({
      where: {
        email: datas.email,
      },
    })
      .then(async (user) => {
        if (user == undefined) {
          await User.create({
            email: datas.email,
            password: hash,
          })
            .then(() => {
              res.redirect("/");
            })
            .catch((error) => {
              console.log(error);
              res.redirect("/");
            });
        } else {
          res.redirect("/");
        }
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};

exports.loginUser = async (req, res) => {
  const datas = {
    email: req.body.email,
    password: req.body.password,
  };

  if (datas.email !== undefined && datas.password !== undefined) {
    await User.findOne({
      where: {
        email: datas.email,
      },
    })
      .then((user) => {
        if (user !== undefined) {
          const correctPw = bcrypt.compareSync(datas.password, user.password);

          if (correctPw) {
            req.session.user = {
              id: user.id,
              email: user.email,
            };

            res.redirect("/logged");
          } else {
            res.redirect("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        res.redirect("/");
      });
  } else {
    res.redirect("/");
  }
};
