import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
      const imagesResponse = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10");
      const catsData = imagesResponse.data.map((cat, index) => ({
          number: index + 1, // Add 1 to index to start numbering from 1
          url: cat.url
      }));
      res.render("index.ejs", { cats: catsData });

  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

