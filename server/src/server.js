import "dotenv/config";

import app from "./app.js";

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log("");
    console.log(
      "======================================"
    );

    console.log(
      "Suriyaprakash Portfolio API"
    );

    console.log(
      `http://localhost:${PORT}`
    );

    console.log(
      "======================================"
    );

    console.log("");
  }
);