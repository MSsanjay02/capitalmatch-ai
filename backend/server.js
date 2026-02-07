const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/search", async (req, res) => {

const { sector, country } = req.body;

const prompt = `
Suggest top 3 investors who invest in ${sector} startups in ${country}.
Return ONLY JSON:
[
 { "name":"","focus":"","location":"","reason":"" }
]
`;

try {

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "openai/gpt-3.5-turbo",
messages: [{ role: "user", content: prompt }]
})
});

const data = await response.json();
res.json(data);

} catch (err) {
console.log(err);
res.status(500).json({ error: "Server error" });
}

});

app.listen(5000, () => console.log("🔥 Server running on port 5000"));
