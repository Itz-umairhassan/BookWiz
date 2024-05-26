export const userExists =  async (req , res)=>{
    try{
        const {userId} = req.body;
        if(!userId){
            res.status(500).json(errorMessage("user id is required"));
            return;
        }
        const user = await User.findById(new mongodb.ObjectId(userId));
        if(!user){
            res.status(500).json(errorMessage("user not found"));
            return;
        }

        next();
    }catch(error){
        console.log(error);
        res.status(500).json(serverError());
    }
}