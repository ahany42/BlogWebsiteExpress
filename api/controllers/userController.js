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
exports.getLoggedInUser = (req,res)=>{
    res.json(users[0]);
}
exports.getUser = (req,res)=>{
    const id = parseInt(req.params.id,10);
    if(!isNaN(id)){
        const user = users.find(user=>user.id===id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    else{
        return res.status(400).json({ error: 'ID parameter is missing' });
    }
}
exports.getAllUsers = () => users;