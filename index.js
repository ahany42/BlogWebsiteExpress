const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());
app.use(express.json());
let LoggedUserImg="https://i.ibb.co/Dr2ZcHQ/IMG-20231027-WA0082.jpg";
app.get('/users/loggedin', (req, res) => {
    res.json({id:1,userName: "Aly Hany", gender: "M",src:LoggedUserImg});
});
let data = [
    {
        id: 2,
        userName: "Samir Kamouna",
        comment: "I found this article very informative.",
        date: "Sep 26, 2024",
        gender: "M",
        postedBy:2
    },
    {
        id: 3,
        userName: "Mohamed Elneny",
        comment: "I disagree with some points mentioned.",
        date: "Sep 27, 2024",
        gender: "M",
        postedBy:3
    },
    {
        id: 4,
        userName: "Fatima Koshary",
        comment: "Can you provide more details on this topic?",
        date: "Aug 1, 2024",
        gender: "F",
        postedBy:4
    },
    {
        id: 5,
        userName: "Eneam Salousa",
        comment: "Can you provide more details on this topic?",
        date: "Aug 17, 2024",
        gender: "F",
        postedBy:4
    }
];
const initialLength = data.length;
app.get('/comments/get/:id',(req,res)=>{
    const id = parseInt(req.params.id,10);
    if(!isNaN(id)){
        const comment = data.find(comment=>comment.id===id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    }
    else{
        return res.status(400).json({ error: 'ID parameter is missing' });
    }

})
app.get('/comments/getall', (req, res) => {
    res.json(data);
})
app.post('/comments/add',(req,res)=>{
let comment = req.body;
if (!comment || Object.keys(comment).length === 0) {
    return res.status(400).send('No comment provided');
  }
  data.push(comment);
  res.status(201).send('Comment added successfully');
})
app.delete('/comments/delete/:id',(req,res)=>{
    const deletedId = parseInt(req.params.id);
    if(!isNaN(deletedId)){
        data = data.filter(comment=>comment.id!==deletedId);
    }
    if (data.length < initialLength) {
        res.status(200).send('Comment deleted successfully');
      } else {
        res.status(404).send('Comment not found');
      }
})
app.listen(3004, () => {
    console.log("Server is running on port 3004");
});
