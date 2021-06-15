const User = require("../models/User");
const moment = require("moment");
const Op = require("sequelize").Op;

exports.homePage = (req, res) => {
  res.render("index");
};

exports.dashboardPage = async (req, res) => {
  await User.findAll()
    .then(async (users) => {
      await User.findAll({
        where: {
          createdAt: {
            [Op.gte]: moment().subtract(1, "days").toDate(),
          },
        },
      })
        .then(async (createdToday) => {
          await User.findAll({
            where: {
              createdAt: {
                [Op.gte]: moment().subtract(7, "days").toDate(),
              },
            },
          })
            .then((createdThisWeek) => {
              res.render("admin/index", {
                users,
                createdToday,
                createdThisWeek,
              });
            })
            .catch((error) => {
              console.log(error);
              res.redirect("/");
            });
        })
        .catch((error) => {
          console.log(error);
          res.redirect("/");
        });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
};
