const express = require("express");
const { parsing } = require("../src/crawl");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const handleAsync = async (keyword) => {
  const sum = await parsing(keyword);
  return sum;
};

app.get("/user", async (req, res) => {
  const data = req.query.uN;
  try {
    const impomation = await handleAsync(data);
    res.send(impomation);
  } catch (error) {
    if (error) res.status(404);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
