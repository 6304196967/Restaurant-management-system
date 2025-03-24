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
const CartSchema = new Schema({
     email: { type: String, required: true },
    items: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true }, 
                quantity: { type: Number, required: true, default: 1 },
                image:{type:String ,required:true} 
            }
        ],
    totalPrice: { type: Number, required: true, default: 0 } // Total cart price
    });

const orderSchema = new Schema({
        email: { type: String, required: true },
        items: [
            {
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, default: 1 },
                image: { type: String, required: true }
            }
        ],
        totalPrice: { type: Number, required: true, default: 0 },
        orderDate: { type: Date, default: Date.now },
        status: { type: String, required: true, default: "Pending" },
    })
const FeedbackSchema = new Schema({ 
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    itemName: { type: String, required: true },
}); 
    
    

const User = mongoose.model('User', UserSchema);
const Menu = mongoose.model('Menu', MenuSchema);
const Cart = mongoose.model("Cart", CartSchema);
const order = mongoose.model("order",orderSchema);
const Feedback = mongoose.model("feedback", FeedbackSchema);




export {
    User,
    Menu,
    Cart,
    order,
    Feedback,
}

