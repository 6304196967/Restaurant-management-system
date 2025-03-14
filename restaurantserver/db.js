import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    username : String,
    email : {type: String, required :true, unique : true},
    password : String,
});

const MenuSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },});

const spoffersSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String },});


const User = mongoose.model('User', UserSchema);
const Menu = mongoose.model('Menu', MenuSchema);
const spoffers = mongoose.model('spoffers', spoffersSchema);





export {
    User,
    Menu,
    spoffers,
}