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

app.post("/calculate-emi", (req, res) => {
  let { name, amount, period } = req.body;
  //  console.log(name, amount, period);
  let RATE = 0;
  let EMI = 0;
  let numOfMonths = period * 12;
  const denominator = 1200;

  switch (name) {
    case "Home Loan":
      RATE = 7 / denominator;
      break;
    case "Personal Loan":
      RATE = 10 / denominator;
      break;
    case "Car Loan":
      RATE = 9 / denominator;
      break;
    default:
      RATE = 8 / denominator;
      break;
  }

  let _amount = parseFloat(amount.replace(/,/g, ""));
  EMI = (_amount * RATE * (1 + RATE) ** numOfMonths) / ((1 + RATE) ** numOfMonths - 1);

  console.log(EMI);

  let _interest = (numOfMonths * EMI) - _amount;
  console.log(_interest);
  let total = _amount + _interest;
  console.log(total);

  let details = {
    interestRate: parseFloat(RATE * 12 * 100).toFixed(2),
    monthlyEMI: parseFloat(EMI).toFixed(2),
    principal: parseFloat(_amount).toFixed(2),
    interest: parseFloat(_interest).toFixed(2),
    totalAmount: parseFloat(total).toFixed(2),
  };
  console.log(details);
  res.status(200).json(details);
});

app.post("/submit-form", (req, res) => {
  res.status(200).json({
    message: "Form submitted successfully",
  });
});
