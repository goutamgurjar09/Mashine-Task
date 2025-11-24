const express = require("express");
const sequelize = require("./src/config/database");
const rateRoutes = require("./src/routes/rateRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected");

        return sequelize.sync({ alter: true }); 
    })
    .then(() => console.log("Tables synced successfully"))
    .catch(err => console.error("Error:", err));

app.use("/api", rateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
