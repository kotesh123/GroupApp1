const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (!err) console.log("Mongodb connection succeeded.");
    else
      console.log(
        "Error while connecting MongoDB : " + JSON.stringify(err, undefined, 2)
      );
    var myobj = [
      {
        group: "Group A",
        user: "Ajay",
        color: "Red",
      },
      {
        group: "Group B",
        user: "Dev",
        color: "Green",
      },
      {
        group: "Group C",
        user: "manoj",
        color: "Blue",
      },
    ];

    db.collection("users").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
    });
  }
);
