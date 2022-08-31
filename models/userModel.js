// const {Model} = require('sequelize');
module.exports=(sequelize , DataTypes)=>{

     const User = sequelize.define("user",{
       
           name:{
                  type:DataTypes.STRING,
                  allowNull:false
           },

           email:{
                  type:DataTypes.STRING,
                  unique:true,
                  allowNull:false,
                  validate:{
                       isEmail:true
                  }
                },

          schoolName:{
                  type:DataTypes.STRING,
                  allowNull:false
                },
          password_hash:{
                 type:DataTypes.STRING,
                 allowNull:false
                },

        })

        return User;

    
}