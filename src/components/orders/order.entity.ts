import { User } from '../users/users.entity';
import { Product } from '../products/product.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
