const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "ASTx1zE7y3zG_teF_NPianQeaH5aDMW8LBtkUjHitcbV-5n_oLn_m0BeYiOPKMh1SBYhnzd2srx42QEW",
  client_secret:
    "EHyt6Js4OAqtpb6L9s73ACOielUIGMVONKQK50XMvmvLTutoFqBvI-orU0YzINfVypdkrI9tZqqRvMii",
});

module.exports = paypal
