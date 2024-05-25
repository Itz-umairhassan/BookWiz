export const validateUser = (req , res , next)=>{
    console.log("this is validation middleware");
    next();
}
