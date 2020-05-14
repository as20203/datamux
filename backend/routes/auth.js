const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const User = require('../models/user');

router.get("/api/users",checkAuth,(req,res,next)=>{
  
    User.find({userType:"user"})
    .select("_id username email")
    .exec()
    .then(users=>{
        return res.status(200).json({
            allUsers:users
        });
    })
})

router.post('/api/register',checkAuth,(req,res)=>{
    if(req.userData.userType!=='admin'){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }

  
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(user);
        if(user.length>=1){
            return res.status(420).json({
                message:"Email Exists"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err 
                    });
                }else{
        
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username:req.body.username,
                        email:req.body.email,
                        password:hash,
                        createdBy:req.userData.email,
                        userType:req.body.userType
                    });
        
                    user
                    .save()
                    .then(result=>{  
                        res.status(200).json({
                            message:'User Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });                    
                }
            })
        }
    }
    )
});


router.post('/api/login',(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
           return res.status(401).json({
                message:"Email does not exist"
            });
        }else{
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                   const token =  jwt.sign({
                        email:user[0].email,
                        username:user[0].username,
                        userType:user[0].userType,
                        id:user[0]._id,   
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    }

                    )
                    return res.status(200).json({
                        message:"Auth Successful",
                        token:token,
                        user:user[0]
                    },)
                }
                return res.status(401).json({
                    message:"Invalid Password"
                });
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
    
})

router.put("/api/last-login",checkAuth,async(req,res)=>{
    const lastLogin=new Date();
    User.updateOne({email:req.userData.email},{$set: {"lastLogin": lastLogin}})
    .exec()
    .then(result=>{
        return res.status(200).json({
            message:"Successfullly updated Login."
        })
    })
})

router.post("/api/reset-password",checkAuth,async(req,res)=>{
  
    //Get the previous password.
    const oldpassword  = req.body.oldpassword;
    const newpassword  = req.body.password;
    User.find({email:req.userData.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(404).json({
                message:"No User Found."
            });
        }else{
            if(oldpassword===newpassword){
                return res.status(402).json({
                    message:"Old password is same as new password."
                });
            }
            bcrypt.compare(oldpassword,user[0].password,(err,result)=>{
                if(err){
                    return res.status(406).json({
                        message:"Auth Failed. Invalid Old Password."
                    });
                }
                if(result){
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(err){
                            return res.status(500).json({
                                error:err 
                            });
                        }else{
                            User.updateOne({email:req.userData.email},{$set: {"password": hash}})
                            .exec()
                            .then(result=>{
                               
                                return res.status(200).json({
                                    message:"Password Reset Successful."
                                })
                            })
                        }
                        
                    })
                   
                }
                
            })
        }

    })
})

router.delete("/api/delete/:email",checkAuth,(req,res,next)=>{
    const email = req.params.email;
    User.deleteOne({email:email})
    .exec()
    .then(result=>{
        return res.status(200).json({
            message:'Successfully Deleted user'
        })
    })
    .catch(err=>{
        return res.status(404).json({
            message:'Could not delte user. Not found'
        })
    })
})

router.post("/api/verify-token",checkAuth,async(req,res)=>{
    const foundUser = await  User.find({username:req.userData.username});
    if(foundUser){
        return res.status(200).json({
            message:"Successfully Authorized",
            user: req.userData
        })
    }
    else {
        res.status(401).json({err: "Authentication failed!", status: 401})
    } 
})
module.exports = router;