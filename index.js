const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routerTabs = require("./routes/tabs.router");
const routeContent = require("./routes/content.router");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

app.use("/api", routerTabs);
app.use("/api/content", routeContent);

require("dotenv").config();

const port = process.env.PORT || 8585;
const connection = mongoose.connection;

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        app.listen(port, () => {
            console.log(`Started..on.port.${port}`);
        });
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
})();

connection.once("open", () => {
    console.log("MongoDB database (tabsRouter) connection established successfully");
});
