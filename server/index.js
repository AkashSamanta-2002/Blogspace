import { app } from "./app.js";
import { connectDB } from "./src/db/db.js";

// Database connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Server started on port: ${process.env.PORT}`),
    );
  })
  .catch((error) => console.log(error));
