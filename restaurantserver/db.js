import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    username : String,
    phonenumber : String,
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
const CartSchema = new Schema({
     email: { type: String, required: true },
    items: [
            {
                name: { type: String, required: true }, 
                price: { type: Number, required: true }, 
                quantity: { type: Number, required: true, default: 1 } 
            }
        ],
    totalPrice: { type: Number, required: true, default: 0 } // Total cart price
    });
    
    
    

const User = mongoose.model('User', UserSchema);
const Menu = mongoose.model('Menu', MenuSchema);
const spoffers = mongoose.model('spoffers', spoffersSchema);
const Cart = mongoose.model("Cart", CartSchema);





export {
    User,
    Menu,
    spoffers,
    Cart,
}