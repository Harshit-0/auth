require("dotenv").config();
const { verify } = require("jsonwebtoken");
module.exports=async(req,res)=>{
  const {token}=req.body;
  try{
    const user = verify(token, process.env.JWT_SECRET);
    return res.json({status:"ok"})
  }catch(error){
    // console.log(error);
    return res.json({status:"error"})
  }
}