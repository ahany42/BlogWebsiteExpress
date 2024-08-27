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
exports.getAllUsers = () => users;