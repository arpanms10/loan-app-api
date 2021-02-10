const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3000;

// middleware

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

app.get("/calculate-emi", (req, res) => {
  // console.log("calculate emi");
  res.status(200).json({
    message: "EMI calculated successfully",
  });
});

app.post("/submit-form", (req, res) => {
  res.status(200).json({
    message: "Form submitted successfully",
  });
});
