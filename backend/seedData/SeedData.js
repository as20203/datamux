const mongoose = require('mongoose');
const User= require('../models/user');
const bcrypt = require('bcryptjs');
let data = [
    {
        username: 'Adil01',
        password: 'Pakistan01',
        email:'muhammad.adil@talkpool.com',
        userType:'admin'
    },
    // {
    //     username: 'jawad',
    //     password: '123456',
    //     email:'jawadzaheer58@gmail.com',
    //     userType:'admin'
    // },
    // {
    //     username: 'ali',
    //     password: 'aezakmi',
    //     email:'ali_123@gmail.com',
    //     userType:'admin'
    // },
    // {
    //     username: 'noshi',
    //     password: 'baguvix',
    //     email:'noshi-456@gmail.com',
    //     userType:'admin'
    // },
    // {
    //     username: 'Nosherwan',
    //     password: 'gesundheit',
    //     email:'nosherwan-345@gmail.com',
    //     userType:'admin'
    // }
]; 
function seedDB(){
    User.find({})
    .exec()
    .then(users=>{
        if(users.length>=1){
            return;
        }else{
            User.deleteMany({},err=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('removed all users');
                    data.forEach(function(seed){
                        bcrypt.hash(seed.password,10,(err,hash)=>{
                            if(err){
                               console.log(err);
                            }else{
                            var newUser = new User({
                                _id: new mongoose.Types.ObjectId(),
                                username:seed.username,
                                email:seed.email,
                                password:hash,
                                userType:seed.userType,
                               
                            });
                            newUser
                            .save()
                            .then(result=>{
                                console.log(result);        
                            })
                            .catch(err=>{
                                console.log(err); 
                            }); 
                        }                   
                    })     
                })
            }
        });
        }
    })
}
module.exports = seedDB;