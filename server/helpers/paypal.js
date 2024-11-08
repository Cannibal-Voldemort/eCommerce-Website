const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AdsEuPR44aFHUB9q3kJYLJZRSPL5QhoDQaJrw9JiOGiFAZ1dorUuW63i-bzkahqG86lsDcq1rEmiDR-Y",
  client_secret:
    "EBTERw-vALXHLWnQfIYg0llTbd2pYP0dCWchxgxT17W8bLOxIsh1kD7Qvuxb0O3NAmP8PtIyxCi9yiiw",
});

module.exports = paypal
