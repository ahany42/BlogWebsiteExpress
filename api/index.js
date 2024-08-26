const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3004;
let comments = [
    {
        id: 2,
        comment: "I found this article very informative.",
        date: "Jun 26, 2024",
        postedBy:2,
        replies:[]
    },
    
    {
        id: 3,
        comment: "I disagree with some points mentioned.",
        date: "Jul 27, 2024",
        postedBy:3,
        replies:[]
    },
    {
        id: 4,
        comment: "Can you provide more details on this topic?",
        date: "Aug 1, 2024",
        postedBy:4,
        replies:[]
    },
    {
        id: 5,
        comment: "Can you provide more details on this topic?",
        date: "Aug 17, 2024",
        postedBy:5,
        replies:[]
    }
];
let users=[
    {
        id:1,
        userName: "Aly Hany", 
        gender: "M",
        src:"https://i.ibb.co/Dr2ZcHQ/IMG-20231027-WA0082.jpg"
    },
    {
        id:2,
        userName: "Samir Kamouna", 
        gender: "M",
        src:""
    },
    {
        id:3,
        userName: "Mohamed Elneny", 
        gender: "M",
        src:""
    },
    {
        id:4,
        userName: "Fatima Koshary", 
        gender: "F",
        src:""
    },
    {
        id:5,
        userName: "Eneam Salousa", 
        gender: "F",
        src:""
    }
];
comments = comments.map(comment=> ({
    ...comment,
     userName: users.find(user => user.id === comment.postedBy)?.userName,
     gender: users.find(user => user.id === comment.postedBy)?.gender,
     src: users.find(user => user.id === comment.postedBy)?.src
  }));
  app.get('/',(req,res)=>{
    res.write("Apis are working");
    res.end();
  })
  //Comments APIs
const initialLength = comments.length;
app.get('/comments/get/:id',(req,res)=>{
    const id = parseInt(req.params.id,10);
    if(!isNaN(id)){
        const comment = comments.find(comment=>comment.id===id);
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
app.get('/comments/getAll', (req, res) => {
    res.json(comments);
})
app.get('/comments/myComments/:id',(req,res)=>{
    const id = parseInt(req.params.id,10);
    const myComments = comments.filter(comment=>comment.postedBy===id);
    res.json(myComments);
})
app.post('/comments/add',(req,res)=>{
let comment = req.body;
comment.id =  (Date.now()%1000000)+ Math.floor(Math.random() * 1000);
console.log(comment.id);
if (!comment || Object.keys(comment).length === 0) {
    return res.status(400).send('No comment provided');
  }
  comments.push(comment);
  res.status(201).send({ message: 'Comment added successfully', id: comment.id });
})
app.delete('/comments/delete/:id',(req,res)=>{
    const deletedId = parseInt(req.params.id);
    if(!isNaN(deletedId)){
        comments = comments.filter(comment=>comment.id!==deletedId);
    }
    if (comments.length < initialLength) {
        res.status(200).send('Comment deleted successfully');
      } else {
        res.status(404).send('Comment not found');
      }
})
app.patch('/comments/edit/:id',(req,res)=>{
    const editedId = parseInt(req.params.id);
    const updates = req.body;
    console.log(editedId);
    const editedComment = comments.find(comment=>comment.id === editedId);
    if(!editedComment){
        return res.status(404).json({error:"Comment Not Found"});
    }
    else{
        Object.assign(editedComment, updates);
        const today = new Date();
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        const dateString = formattedDate.toString(); 
        editedComment.date="edited at "+dateString;
    }
    console.log(editedComment);
    res.json({ message: 'Comment updated successfully',date:editedComment.date,comment:editedComment.comment });
})
//Replies 
app.post('/comments/replies/add/:id',(req,res)=>{
    let reply = req.body;
    if (!reply || Object.keys(reply).length === 0) {
        return res.status(400).send('No reply provided');
      }
    reply.id = comment.id =  (Date.now()%1000000)+ Math.floor(Math.random() * 500);
    let commentId = parseInt(req.params.id);
    if(!isNaN(commentId)){
        const comment = comments.find(comment=>comment.id===commentId);
        if (comment) {
            comment.replies.push(reply);
            res.status(201).send({ message: 'Reply added successfully', replies: comment.replies });
        } else {
            res.status(404).json({ error: 'Comment Id not found' });
        }
    }
      
    })
app.delete('comments/replies/delete/:commentId/:replyId',(req,res)=>{
    let commentId = parseInt(req.params.commentId);
    let replyId = parseInt(req.params.replyId);
    if(!isNaN(commentId)){
        const comment = comments.find(comment=>comment.id===commentId);
        if (comment) {
          if(!isNaN(replyId)){
           comment.replies.filter(reply => reply.id === replyId);
           res.status(200).send({ message: 'Reply deleted successfully', replies: comment.replies });
          }
          else{
            res.status(404).json({ error: 'Reply Id not found' });
          }
        } else {
            res.status(404).json({ error: 'Comment Id not found' });
        }
    }
})
//UsersApi
app.get('/users/loggedIn', (req, res) => {
    res.json(users[0]);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;