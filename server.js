const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
// require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 8080;

// app.use(cors());
const corsOptions = {
    origin: "https://sunflower-washateria.netlify.app",
    credentials: true,
};

// enable cors
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.options(
    '*',
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

// app.use(cors(corsOptions));
app.use(express.json());
app.use(require("./routes/login-register.js"));
app.use(require("./routes/order.js"));
app.use(require("./routes/contact.js"));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.log(err);
        }
    });

    console.log(`Server is running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("server is running!");
});