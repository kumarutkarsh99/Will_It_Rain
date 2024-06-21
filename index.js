import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

const yourAPIKey = "ZUTZGTWH2M5MUG2F9MKDWKX4H";

app.get("/", (req, res) => {
    res.render("index.ejs", { content: null });
});

app.post("/submit", async(req,res) => {
    try{
        console.log(req.body);
        const lat = req.body.latitude;
        const lon = req.body.longitude;
        const result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${yourAPIKey}`);
        console.log("Result data:", result.data);
        res.render("index.ejs", {content: {...result.data}});
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});