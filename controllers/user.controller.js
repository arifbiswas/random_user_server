const fs = require('fs');
const database = require('../database/data.json');
const crypto = require("crypto");


module.exports.getRandomUser = (req,res)=>{
    res.status(200).send({
        status : true,
       message: "success",
       data: database[(database.length * Math.random()) << 0]
       
    })
   }

module.exports.getAllUser = (req,res)=>{
    res.status(200).send({
        status : true,
       message: "success",
       data : database
    })
}

module.exports.saveUser = (req,res)=>{
    const insertId = crypto.randomBytes(10).toString("hex");
    const {id,gender,name,contact,address,photoUrl} = req.body;

    let newUser = {};
    if(!id || id){
        newUser.id = insertId;
    }
    if(!name){
        res.status(400).send({status : false, message : 'Please input your name'})
    }
    if(name){
        newUser.name = name;
    }
    if(!gender){
        res.status(400).send({status : false, message : 'Please input your gender'})
    }
    if(gender){
        newUser.gender = gender;
    }
    if(!contact){
        res.status(400).send({status : false, message : 'Please input your contact number'})
    }
    if(contact){
        newUser.contact = contact;
    }
    if(!address){
        res.status(400).send({status : false, message : 'Please input your address'})
    }
    if(address){
        newUser.address = address;
    }
    if(!photoUrl){
        res.status(400).send({status : 'error', message : 'Please input your photoUrl'})
    }
    if(photoUrl){
        newUser.photoUrl = photoUrl;
    }
   if(gender && name && contact && address && photoUrl){
    fs.writeFile("./database/data.json",JSON.stringify([...database,newUser],null,2),err =>{
        if(err){
            console.log(err.message);
        }
    })
    res.status(200).send({
        status : true,
       message: "success",
       insetId : insertId,
    })
   }else{
    res.status(400).send({status : false, message : 'Please fill all the fields'})
   }
}

module.exports.updateOne = (req,res)=>{
    const id = req.params.id;
    const {gender,name,contact,address,photoUrl} = req.body;

    // console.log(gender,name,contact,address,photoUrl);
    const restUserData = database.filter(user=>user.id !== id)
    let updateUser = database.find(user=>user.id === id)

    if(!updateUser){
        res.send({status : false, message : 'User not found'})
    }
    if(gender){
        updateUser.gender = gender;
    }
    if(name){
        updateUser.name = name;
    }
     if(contact){
        updateUser.contact = contact;
    }
    if(address){
        updateUser.address = address;
    }
    if(photoUrl){
        updateUser.photoUrl = photoUrl;
    }

    fs.writeFile("./database/data.json",JSON.stringify([...restUserData,updateUser],null,2),err =>{
        if(err){
            console.log(err.message);
        }
    })
  
    res.status(200).send({
        status : true,
       message: "success",
    })
}

module.exports.updateMany = (req,res)=>{
    // const restUsers = database.filter(user=>user.id !== id)
   const userData = req.body;

   let restUser = [];
   for(const user of userData){
    restUser.push(database.find(dbUser=>dbUser.id !== user.id ))
   }

   if(restUser.length === database.length){
    restUser =[]
   }
//    console.log(restUser);

   if(userData?.length > 0){
    let updatedUser =[];
    for(let i = 0; i < userData.length; i++) {
        const newUpdateUser = userData[i];  
        const updateUser = database.find(user=>user.id === newUpdateUser.id)
        if(newUpdateUser?.gender){
            updateUser.gender = newUpdateUser?.gender;
        }
        if(newUpdateUser?.name){
            updateUser.name = newUpdateUser?.name;
        }
         if(newUpdateUser?.contact){
            updateUser.contact = newUpdateUser?.contact;
        }
        if(newUpdateUser?.address){
            updateUser.address = newUpdateUser?.address;
        }
        if(newUpdateUser?.photoUrl){
            updateUser.photoUrl = newUpdateUser?.photoUrl;
        }
        updatedUser.push(updateUser);
    }
  
    fs.writeFile("./database/data.json",JSON.stringify([...restUser, ...updatedUser],null,2),err =>{
        if(err){
            console.log(err.message);
        }
    })
       res.status(200).send({
           status : true,
          message: "success",
          data : database
       })
   }else{
    res.status(400).send({status : false, message : 'You must be send Array of Objects'})
   }
}

module.exports.deleteOne = (req,res)=>{
    const id = req.params.id;
    const restUsers = database.filter(user=> user.id !== id)
    // console.log(restUsers);
     if(restUsers.length > 0){
        fs.writeFile("./database/data.json",JSON.stringify([...restUsers],null,2),err =>{
            if(err){
                console.log(err.message);
            }
        })
        res.status(200).send({
            status : true,
            message: "success",
        })
     }else{
        res.status(400).send({status : false, message : 'User not found'})
     }
}