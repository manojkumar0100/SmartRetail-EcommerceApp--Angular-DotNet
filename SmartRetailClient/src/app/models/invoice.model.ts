export interface OrderItem {
    name: string;
    price : number;
    quantity : number;
   
  }
  
  export interface Invoice {
    invoiceID: number;
    
    invoiceDate: string;
    orderID : number;
    totalAmount : number;
    taxAmount : number;
    shippingCost : number;
    firstName : string;
    lastName : string;
    email : string;
    phonenumber : string;
    address : string;
    orderitems: OrderItem[];
    
  }