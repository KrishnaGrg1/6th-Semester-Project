import express from "express";
import connectToDB from "./connect.js";
import { UserRouter } from "./routes/routes.js";

connectToDB()
  .then(function (connectMessage) {
    console.log(connectMessage);
  })
  .catch(function (err) {
    console.error(err);
  });

const app = express();
app.use(express.json());
app.use('/auth',UserRouter);

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Server running on PORT", port);
});
