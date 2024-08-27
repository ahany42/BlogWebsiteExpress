const express = require('express');
const { getUsers, getAllUsers } = require('./userController');
let comments = [
    {
        id: 2,
        comment: "I found this article very informative.",
        date: "9 : 00 , 26 Jun 24",
        postedBy:2,
        replies:[{
        id: 2,
        reply: "reply 1",
        date: "17 : 30 , 26 Jun 24"
        },{
            id: 4,
            reply: "reply 2",
            date: "17 : 30 26 , Jun 24"
        }

    ]
    },
    
    {
        id: 3,
        comment: "I disagree with some points mentioned.",
        date: "12 : 00 , 26 Jul 24",
        postedBy:3,
        replies:[]
    },
    {
        id: 4,
        comment: "Can you provide more details on this topic?",
        date: "11 : 00 , 28 Jul 24",
        postedBy:4,
        replies:[]
    },
    {
        id: 5,
        comment: "Can you provide more details on this topic?",
        date: "12 : 00 , 16 Aug 24",
        postedBy:5,
        replies:[]
    }
];
const users=getAllUsers();
comments = comments.map(comment=> ({
    ...comment,
     userName: users.find(user => user.id === comment.postedBy)?.userName,
     gender: users.find(user => user.id === comment.postedBy)?.gender,
     src: users.find(user => user.id === comment.postedBy)?.src
  }));
const initialLength = comments.length;
exports.getCommentById = (req,res)=>{
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
}
exports.getAllComments = (req,res)=>{
    res.json(comments);
}
exports.getMyComments = (req,res)=>{
    const id = parseInt(req.params.id,10);
    const myComments = comments.filter(comment=>comment.postedBy===id);
    res.json(myComments);
}
exports.addComment = (req,res)=>{
    let comment = req.body;
    comment.id =  (Date.now()%1000000)+ Math.floor(Math.random() * 1000);
    console.log(comment.id);
    if (!comment || Object.keys(comment).length === 0) {
        return res.status(400).send('No comment provided');
    }
    comments.push(comment);
    res.status(201).send({ message: 'Comment added successfully', id: comment.id });
}
exports.deleteComment = (req,res)=>{
    const deletedId = parseInt(req.params.id);
    if(!isNaN(deletedId)){
        comments = comments.filter(comment=>comment.id!==deletedId);
    }
    if (comments.length < initialLength) {
        res.status(200).send('Comment deleted successfully');
      } else {
        res.status(404).send('Comment not found');
      }
}
exports.editComment = (req,res)=>{
    const editedId = parseInt(req.params.id);
    const updates = req.body;
    console.log(editedId);
    const editedComment = comments.find(comment=>comment.id === editedId);
    if(!editedComment){
        return res.status(404).json({error:"Comment Not Found"});
    }
    else{
        Object.assign(editedComment, updates);
        const now = new Date();
        now.setHours(now.getHours() + 3);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedDate =`${now.getHours().toString().padStart(2, '0')} : ${now.getMinutes().toString().padStart(2, '0')} , ${now.getDate().toString().padStart(2, '0')} ${monthNames[now.getMonth()].toString().padStart(2, '0')} ${now.getFullYear().toString().slice(-2)}`;
        const dateString = formattedDate.toString(); 
        editedComment.date="edited at "+dateString;
    }
    console.log(editedComment);
    res.json({ message: 'Comment updated successfully',date:editedComment.date,comment:editedComment.comment });
}
exports.addReply = (req,res)=>{
    let reply = req.body;
    if (!reply || Object.keys(reply).length === 0) {
        return res.status(400).send('No reply provided');
        }
    reply.id =  (Date.now()%1000000)+ Math.floor(Math.random() * 500);
    let commentId = parseInt(req.params.commentId);
    if(!isNaN(commentId)){
        const comment = comments.find(comment=>comment.id===commentId);
        if (comment) {
            comment.replies.push(reply);
            res.status(201).send({ message: 'Reply added successfully', replies: comment.replies });
        } else {
            res.status(404).json({ error: 'Comment Id not found' });
        }
    }   
}
exports.deleteReply = (req,res)=>{
    let commentId = parseInt(req.params.commentId);
    let replyId = parseInt(req.params.replyId);
    if(!isNaN(commentId)){
        const comment = comments.find(comment=>comment.id===commentId);
        if (comment) {
          if(!isNaN(replyId)){
            const reply = comment.replies.find ( reply => reply.id === replyId);
            if (reply){

                comment.replies.filter(reply => reply.id === replyId);
                res.status(200).send({ message: 'Reply deleted successfully', replies: comment.replies });
            }
            else{
              res.status(404).json({ error: 'Reply Id not found' });
            }
          }
        } else {
            res.status(404).json({ error: 'Comment Id not found' });
        }
    }
}
exports.editReply = (req,res)=>{

}