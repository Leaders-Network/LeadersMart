import mongoose, { Schema, Document, Model } from 'mongoose';

interface IDeliveryService {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  vendorLocation: string;
  selectedDeliveryService?: IDeliveryService;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryServiceSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  estimatedDays: String,
}, { _id: false });

const CartItemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  vendorLocation: String,
  selectedDeliveryService: DeliveryServiceSchema,
}, { _id: false });

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;