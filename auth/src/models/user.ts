import { Password } from '../services/password';
import mongoose from "mongoose";
//an interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}
//an interface that describes the properties that user modal has
interface UserModal extends mongoose.Model<UserDoc>{
    build(attrs:UserAttrs):UserDoc;
}

//interface that describes the props that a user doc has
interface UserDoc extends mongoose.Document{
email:string;
password: string
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save',async function(done){
  if(this.isModified('password')){
    const hashed =  await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})


userSchema.statics.build =(attrs: UserAttrs) => {
    return new User(attrs);
  };

const User = mongoose.model<UserDoc,UserModal>("User", userSchema);



export { User };
