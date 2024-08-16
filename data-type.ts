export interface SignUp {
    name:string,
    password:string,
    email:string
}

export interface Login {
    password:string,
    email:string
}

export interface Product {
    id:number,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    productId:undefined | number
}

export interface Cart {
    id: undefined | number,
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    quantity:undefined | number,
    userId:number,
    productId:number
}

export interface priceSummary {
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface Order {
    userId:number,
    totalPrice:number,
    email:string,
    address:string,
    contact:string,
    id:number|undefined
}