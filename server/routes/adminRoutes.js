const Admin=require ('../models/Admin');
const express=require ('express');
const router = express.Router();

router.get('/',async(req,res)=>{
    return res.json("Api called")
})
router.post('/',async(req,res)=>{
    const reg = await new Admin(req.body)
    reg.save();

    return res.json("Admin Registered Successfully")

});
router.post('/login',async(req,res)=>{
    const{email,password}=req.body;

    const admin = await Admin.findOne ({email:email});
    if(!admin){
        return res.status(400).json("Admin not found")    
    }
    if(admin.password==password){
        return res.status(200).json ({message:"Login Successfully",admin:{
            email:admin.email,
            id:admin._id,
            role:"admin"

        }})
    }
    else{
        return res.json({message:"Password not matched"})
    }

})

router.put('/change/:id',async(req,res)=>{
    const {op,np,cnp}=req.body;
    const{id}=req.params;
    const admin=await Admin.findById(req.params.id);
    if(!admin){
        return res.json({message:"Details not matched"})
    }
    if(admin.password==op){
        if(op==np){
            return res.json({message:"Your old and new password are same"})
        }else if(np==cnp){
            try{
                const ex= await Admin.findByIdAndUpdate(id,{password:cnp});
                return res.json({message:"Password updated successfully"})
            }
            catch(er){
                console.log(er)
                return res.json({message:"Sorry try again later"})
            }
        }

    }else{
        return res.json({message:"Your old password not matched"})
    }
})
module.exports=router