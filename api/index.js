const express = require("express");
const cors = require("cors"); 
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3004;
const userController = require('./contollers/userController');
const commentController = require('./contollers/commentController');

app.get('/',(req,res)=>{
    res.write("Apis are working");
    res.end();
  })
  //Comments APIs
app.get('/comments/get/:id',commentController.getCommentById);
app.get('/comments/getAll',commentController.getAllComments);
app.get('/comments/myComments/:id',commentController.getMyComments);
app.post('/comments/add',commentController.addComment);
app.delete('/comments/delete/:id',commentController.deleteComment);
app.patch('/comments/edit/:id',commentController.editComment);
//Replies 
app.post('/comments/replies/add/:commentId',commentController.addReply);
app.delete('/comments/:commentId/replies/delete/:replyId',commentController.deleteReply);
app.patch('/comments/:commentId/replies/:replyId',commentController.editReply);
    
//Users
app.get('/users/loggedIn',userController.getLoggedInUser);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;