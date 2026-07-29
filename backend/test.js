const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://firstgen:Firstgen2026@cluster0.smhnzyp.mongodb.net/firstgen?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("Connected");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});