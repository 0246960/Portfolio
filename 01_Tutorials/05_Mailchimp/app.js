const express = require("express");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

app.route("/")
    .get((req, res) => {
        res.sendFile(__dirname + "/signup.html");
    })
    .post((req, res) => {
        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const email = req.body.email;

        const mailchimpData = {
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                }
            ]
        };

        const jsonData = JSON.stringify(mailchimpData);
        const listId = "1556e62296";
        const apiKey = "7e8d9289fb8874caa49351151f5a376d-us2";
        const url = "https://us2.api.mailchimp.com/3.0/lists/" + listId;
        const options = {
            method: "POST",
            auth: "gcastillo56:" + apiKey
        };

        const itemName = "<li>item 1</li><li>item 2</li>";

        const mailRequest = https.request(url, options, (response) => {
            if (response.statusCode === 200) {
                response.on("data", (data) => {
                    const jsonResp = JSON.parse(data);

                    if (jsonResp["error_count"] === 0) {
                        res.render(__dirname + "/success.html", { itemName: itemName });
                    } else {
                        res.render(__dirname + "/failure.html", { itemName: itemName });
                        console.log(jsonResp.errors[0]["error_code"]);
                        console.log(jsonResp.errors[0]["error"]);
                    }
                }).on("error", (e) => {
                    res.render(__dirname + "/failure.html", { itemName: itemName });
                });
            } else {
                res.render(__dirname + "/failure.html", { itemName: itemName });
            }
        });

        mailRequest.write(jsonData);
        mailRequest.end();
    });

app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});