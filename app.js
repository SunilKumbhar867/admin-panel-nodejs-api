const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();


// import routes
const registerationRoutes = require("./src/routes/user");
const titleRoutes = require("./src/routes/title");
const slidingRoutes = require("./src/routes/sliding");
const smalllayoutRoutes = require("./src/routes/smalllayout");
const giftRoutes = require("./src/routes/gift");
const quizRoutes = require("./src/routes/quiz");
const jsonRoutes = require("./src/routes/json");
const blogRoutes = require("./src/routes/blog");

// app middlewares
app.use(morgan('dev'));

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));

// app.use(cors());
app.use(cors({ origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_ADMIN] }));

// middlewares
app.use("/api", registerationRoutes);
app.use("/api", titleRoutes);
app.use("/api", slidingRoutes);
app.use("/api", smalllayoutRoutes);
app.use("/api", giftRoutes);
app.use("/api", quizRoutes);
app.use("/api", jsonRoutes);
app.use("/api", blogRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`API is running on port ${port}`));
