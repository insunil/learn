import express from "express"
import "./database/db.js"
import productRoutes from "./routes/productRoute.js";
import { logger } from "./middleware/logger.js";
const app = express();
app.use(express.json());
app.use(logger);
app.get("/", (req, res) => {
    res.send("Hello Mongo");
});
app.use("/products", productRoutes);

app.listen(8000, () => {
    console.log(" Server running on port 8000");
});
