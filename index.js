const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());
app.use(express.json());
let LoggedUserImg="https://i.ibb.co/Dr2ZcHQ/IMG-20231027-WA0082.jpg";
app.get('/Users/LoggedInUser', (req, res) => {
    res.json({userName: "Aly Hany", gender: "M",src:LoggedUserImg});
});
let data = [
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
app.get('/Comments/GetAll', (req, res) => {
    res.json(data);
});
app.post('/Comments/AddComment',(req,res)=>{
let comment = req.body;
data.push(comment);
if (!comment || Object.keys(comment).length === 0) {
    return res.status(400).send('No comment provided');
  }
  data.push(comment);
  res.status(201).send('Comment added successfully');
})
app.listen(3004, () => {
    console.log("Server is running on port 3004");
});
