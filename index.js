const express = require("express");
const cors = require("cors"); 

const app = express();
app.use(cors());
let LoggedUserImg="https://i.ibb.co/Dr2ZcHQ/IMG-20231027-WA0082.jpg";
app.get('/LoggedInUser', (req, res) => {
    res.json({userName: "Aly Hany", gender: "M",src:LoggedUserImg});
});
app.get('/Comments', (req, res) => {
    const data = [
        {
            id: 1,
            UserName: "Aly Hany",
            Comment: "This is a great post!",
            Date: "Sep 25, 2024",
            src:LoggedUserImg,  
            Gender: "M"
        },
        {
            id: 2,
            UserName: "Bob",
            Comment: "I found this article very informative.",
            Date: "Sep 26, 2024",
            Gender: "M"
        },
        {
            id: 3,
            UserName: "Charlie",
            Comment: "I disagree with some points mentioned.",
            Date: "Sep 27, 2024",
            Gender: "M"
        },
        {
            id: 4,
            UserName: "Diana",
            Comment: "Can you provide more details on this topic?",
            Date: "Aug 04, 2024",
            Gender: "F"
        }
    ];

    res.json(data);
});

app.listen(3004, () => {
    console.log("Server is running on port 3004");
});
