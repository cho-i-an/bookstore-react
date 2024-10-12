// Contains all the custom types we want to use for our application
import Adventure from './assets/images/categories/adventure.jpg';
import Literary from './assets/images/categories/literary.jpg';
import Business from './assets/images/categories/business.jpg';
import YoungAdult from './assets/images/categories/young-adult.jpg';
import Fantasy from './assets/images/categories/fantasy.jpg';
import Romance from './assets/images/categories/romance.jpg';
import Mystery from './assets/images/categories/mystery.jpg';
import Health from './assets/images/categories/health.jpg';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
export const categoryImages: Record<string, any> = {
  adventure: Adventure,
  literary: Literary,
  business: Business,
  youngadult: YoungAdult,
  fantasy : Fantasy,
  romance : Romance,
  mystery : Mystery,
  health: Health
};

export interface CatProp{
    catList:CategoryItem[];
}
// export const categoryList = [
//   { categoryId: 1001, name: "Adventure" },
//   { categoryId: 1002, name: "Classics" },
//   { categoryId: 1003, name: "Business" },
//   { categoryId: 1004, name: "YoungAdult" },
//   { categoryId: 1005, name: "Fantasy" },
//   { categoryId: 1006, name: "Romance" },
//   { categoryId: 1007, name: "Mystery" },
//   { categoryId: 1008, name: "HealthFitness" },
// ];

// export const bookList = [
//   {
//     bookId: 1001,
//     title: "We Must Not Think of Ourselves",
//     author: "Lauren Grodstein",
//     price: 1876,
//     isPublic: false,
//   },
//   {
//     bookId: 1002,
//     title: "In an Instant",
//     author: "Suzanne Redfearn",
//     price: 1495,
//     isPublic: true,
//   },
//   {
//     bookId: 1003,
//     title: "Beyond That, the Sea",
//     author: "Lauren Grodstein",
//     price: 1026,
//     isPublic: false,
//   },
//   {
//     bookId: 1004,
//     title: "The Last of the Moon Girls",
//     author: "Barbara Davis",
//     price: 1876,
//     isPublic: true,
//   },
// ];


// // ];the custom types we want to use for our application
// import Classics from './assets/images/categories/classics.jpg';
// import Fantasy from './assets/images/categories/fantasy.jpg';
// import Mystery from './assets/images/categories/mystery.jpg';
// import Romance from './assets/images/categories/romance.jpg';

//this interface represents the books in our bookstore



//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}
// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];