import { Schema,model } from "mongoose"; 

export const UserSchema=new Schema ({
    name:{type:String,required:true},
    email:{type:String,unique:true, required: true },
    password:{type:String,required:true},
    address:{type:String,required:true},
    isAdmin:{type:Boolean,required:true},
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

export const UserModel=model('User',UserSchema);
