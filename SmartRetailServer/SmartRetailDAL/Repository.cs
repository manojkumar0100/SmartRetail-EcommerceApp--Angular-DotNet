using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Principal;
using SmartRetail_DAL.Models;
using System.Web.Cors;





namespace SmartRetail_DAL
{

    public class Repository
    {
        SmartRetailDBContext context;



        public Repository()
        {
            context = new SmartRetailDBContext();
        }


        //user & admin
        //product
        public IEnumerable<ProductDTO> GetProducts()
        {
            List<Product> products = context.Products.ToList();
            List<ProductDTO> productsdto = new List<ProductDTO>();
            foreach (Product product in products)
            {
                productsdto.Add(new ProductDTO(product.productID, product.name, product.description, product.price, product.quantity, "data:image/jpeg;base64,"+Convert.ToBase64String(product.imageUrlContent), product.categoryID));

            }
            return productsdto;
            //return context.Products.Select(product => new ProductDTO(product.productID,product.name,product.description,product.price,product.quantity,product.imageUrl,product.categoryID)).ToList();
        }


        //user & admin
        //category
        public List<CategoryDTO> GetCategories()
        {
            List<Category> categories = context.Categories.ToList();
            List<CategoryDTO> categoriesdto = new List<CategoryDTO>();
            foreach (Category category in categories)
            {
                categoriesdto.Add(new CategoryDTO(category.categoryID, category.name));
            }
            return categoriesdto;
        }





        //user
        //product
        public decimal GetProductPrice(int productID)
        {
            return context.Products.Where(product => product.productID == productID).Select(product => product.price).First();

        }

        public int AddProductReview(Review review)
        {
            context.Reviews.Add(review);
            return context.SaveChanges();
        }


        public List<ReviewDTO> GetProductReviews(int productid)
        {
            List<ReviewDTO> reviewDTOs = new List<ReviewDTO>();
            List<Review> reviews = context.Reviews.Where(review => review.productID == productid).ToList();
            foreach(Review review in reviews)
            {
                string name = context.Customers.Where(customer => customer.customerID == review.customerID).Select(customer => customer.firstName +" "+ customer.lastName).FirstOrDefault();
                reviewDTOs.Add(new ReviewDTO(review.reviewID, review.rating, review.comment, review.reviewDate, productid, name));
            }
            return reviewDTOs;
        }

        public bool CheckProductOrdered(int productid,int customerid)
        {
            List<int> productids = context.Orders
                       .Where(order => order.customerID == customerid)
                       .Join(context.OrderItems,
                             order => order.orderID,
                             orderItem => orderItem.orderID,
                             (order, orderItem) => orderItem.productID).ToList();

            return productids.Contains(productid);


        }







        //user
        //profile


        public string RegisterCustomer(Customer customer)
        {
            if(context.Customers.Where(customer1 => customer1.email == customer.email).FirstOrDefault()!=null)
            {
                return "Email Already Exists";
            }
            else if (context.Customers.Where(customer1 => customer1.phoneNumber == customer.phoneNumber).FirstOrDefault() != null)
            {
                return "PhoneNumber Already Exists";
            }


            context.Customers.Add(customer);
            if(context.SaveChanges()>0)
            {
                return GenerateToken(customer.email);
            }
            return "Registration Failed";
            
        }

        public string LoginCustomer(string email, string password)
        {
            Customer customer = context.Customers.Where(customer1 => customer1.email == email).FirstOrDefault();
            if (customer == null)
            {
                return "Email Not Matched";
            }
            if (customer.password == password)
            {
                return GenerateToken(email);
            }
            return "Password Not Matched";
        }

        private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

        public static string GenerateToken(string email, int expireMinutes = 100)
        {
            var symmetricKey = Convert.FromBase64String(Secret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, email)
        }),

                Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(symmetricKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        public Customer GetCustomer(string email)
        {
            return context.Customers.Where(customer => customer.email == email).FirstOrDefault();
        }



        public int UpdateProfile(Customer customer)
        {

            Customer newcustomer = context.Customers.Find(customer.customerID);
            if (newcustomer == null)
            {
                return -1;
            }
            newcustomer.firstName = customer.firstName;
            newcustomer.lastName = customer.lastName;
            newcustomer.email = customer.email;
            newcustomer.phoneNumber = customer.phoneNumber;
            return context.SaveChanges();
        }

        public int UpdatePassword(Customer customer)
        {
            Customer newcustomer = context.Customers.Find(customer.customerID);
            if (newcustomer == null)
            {
                return -1;
            }
            newcustomer.password = customer.password;
            return context.SaveChanges();
        }




        //user
        //wishlist

        public bool CheckWishlistProduct(int customerid,int productid)
        {
            if(context.Wishlists.Where(wishlist => wishlist.customerID == customerid && wishlist.productID == productid).FirstOrDefault()!=null)
            {
                return true;
            }
            return false;
        }


        public List<WishlistDTO> GetWishlistProducts(string email)
        {
            int customerID = context.Customers.Where(customer => customer.email == email).Select(customer => customer.customerID).FirstOrDefault();
            List<Wishlist> wishlists = context.Wishlists.Where(wishlistproduct => wishlistproduct.customerID == customerID).ToList();
            List<WishlistDTO> wishlistDTOs = new List<WishlistDTO>();
            foreach (Wishlist wishlist in wishlists)
            {
                wishlistDTOs.Add(new WishlistDTO(wishlist.wishlistID, wishlist.dateAdded, wishlist.productID, wishlist.customerID));
            }
            return wishlistDTOs;
        }


        public int AddWishlistProduct(Wishlist wishlistproduct)
        {
            if(context.Wishlists.Where(wishlist => wishlist.productID == wishlistproduct.productID && wishlist.customerID == wishlistproduct.customerID).FirstOrDefault() !=null)
            {
                return 1;
            }
            context.Wishlists.Add(wishlistproduct);
            return context.SaveChanges();
        }


        public int DeleteWishlistProduct(int customerid,int productid)
        {
            Wishlist wishlistproduct = context.Wishlists.Where(wishlist => wishlist.productID == productid && wishlist.customerID == customerid).FirstOrDefault();
            if (wishlistproduct == null)
            {
                return -1;
            }
            context.Wishlists.Remove(wishlistproduct);
            return context.SaveChanges();
        }




        //user
        //cart
        public List<CartDTO> GetCartProducts(string email)
        {
            int customerID = context.Customers.Where(customer => customer.email == email).Select(customer => customer.customerID).FirstOrDefault();
            List<Cart> cartproducts = context.Carts.Where(cartproduct => cartproduct.customerID == customerID).ToList();
            List<CartDTO> cartDTOs = new List<CartDTO>();
            foreach (Cart cartproduct in cartproducts)
            {
                int categoryid = context.Products.Where(product => product.productID == cartproduct.productID).Select(product => product.categoryID).FirstOrDefault();
                cartDTOs.Add(new CartDTO(cartproduct.cartID, cartproduct.productQuantity, cartproduct.dateAdded, cartproduct.productID, cartproduct.customerID,categoryid));
            }
            return cartDTOs;

        }

        public int AddCartProduct(Cart cartproduct)
        {
            Cart existedcart = context.Carts.Where(cart => cart.productID == cartproduct.productID && cart.customerID == cartproduct.customerID).FirstOrDefault();
            if(existedcart !=null)
            {
                existedcart.productQuantity+=cartproduct.productQuantity;
                return context.SaveChanges();
            }
            
            context.Carts.Add(cartproduct);
            return context.SaveChanges();
        }

        public int DeleteCartProduct(int cartid)
        {
            Cart cartproduct = context.Carts.Find(cartid);
            if (cartproduct == null)
            {
                return -1;
            }
            context.Carts.Remove(cartproduct);
            return context.SaveChanges();
        }

        public int DeleteCartProducts(string email)
        {
            int customerID = context.Customers.Where(customer => customer.email == email).Select(customer => customer.customerID).FirstOrDefault();
            List<Cart> cartproducts = context.Carts.Where(cartproduct => cartproduct.customerID == customerID).ToList();
            context.Carts.RemoveRange(cartproducts);
            return context.SaveChanges();
        }

        public int IncCartQty(int cartid)
        {
            Cart cartproduct = context.Carts.Find(cartid);
            cartproduct.productQuantity++;
            return context.SaveChanges();

        }

        public int DecCartQty(int cartid)
        {
            Cart cartproduct = context.Carts.Find(cartid);
            cartproduct.productQuantity--;
            return context.SaveChanges();

        }





   
        //user
        //order
        public int AddOrder(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
            return order.orderID;
        }


        public List<OrderDTO> GetOrders(int customerid)
        {
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            List<Order> orders = context.Orders.Where(order => order.customerID == customerid).ToList();
            foreach(Order order in orders)
            {
                Payment orderpayment = context.Payments.Where(payment => payment.orderID == order.orderID).FirstOrDefault();
                orderDTOs.Add(new OrderDTO(order.orderID, order.orderDate, orderpayment.amount));
            }
            return orderDTOs;


        }


        public InvoiceDTO GetInvoice(int orderid)
        {
            InvoiceDTO invoiceDTO = new InvoiceDTO();


            Order order = context.Orders.Find(orderid);
            invoiceDTO.orderID = order.orderID;
            invoiceDTO.address = order.address;
            int customerid = order.customerID;

            Invoice invoice = context.Invoices.Where(invoice1 => invoice1.orderID==orderid).FirstOrDefault();
            invoiceDTO.invoiceID = invoice.invoiceID;
            invoiceDTO.invoiceDate = invoice.invoiceDate;
            invoiceDTO.totalAmount = invoice.totalAmount + invoice.taxAmount + invoice.shippingCost;
            invoiceDTO.taxAmount = invoice.taxAmount;
            invoiceDTO.shippingCost = invoice.shippingCost;

            Customer customer = context.Customers.Find(customerid);
            invoiceDTO.firstName = customer.firstName;
            invoiceDTO.lastName = customer.lastName;
            invoiceDTO.email = customer.email;
            invoiceDTO.phonenumber = customer.phoneNumber;

            List<OrderItem> orderitems = context.OrderItems.Where(orderitem => orderitem.orderID == orderid).ToList();
            List<OrderItemDTO> orderitemDTOs = new List<OrderItemDTO>();
            foreach(OrderItem orderitem in orderitems)
            {
                Product product = context.Products.Find(orderitem.productID);
                OrderItemDTO orderitemDTO = new OrderItemDTO(product.name, orderitem.price, orderitem.quantity);
                orderitemDTOs.Add(orderitemDTO);
               
            }
            invoiceDTO.orderitems = orderitemDTOs;

            return invoiceDTO;

            











        }




        //user
        //orderItem
        public int AddOrderItem(OrderItem orderitem)
        {
            Product product = context.Products.Find(orderitem.productID);
            product.quantity -= orderitem.quantity;
            context.OrderItems.Add(orderitem);
            return context.SaveChanges();
        }

        //user
        //payment
        public int AddPayment(Payment payment)
        {
            context.Payments.Add(payment);
            return context.SaveChanges();
        }


        //user
        //invoice
        public int AddInvoice(Invoice invoice)
        {
            context.Invoices.Add(invoice);
            return context.SaveChanges();
        }



        //admin
        //profile
        public string LoginAdmin(string email, string password)
        {
            Admin admin = context.Admins.Where(admin1 => admin1.email == email).FirstOrDefault();
            if (admin == null)
            {
                return "Email Not Matched";
            }
            if (admin.password == password)
            {
                return GenerateToken(email);
            }
            return "Password Not Matched";
        }


        public Admin GetAdmin(string email)
        {
            return context.Admins.Where(admin => admin.email == email).FirstOrDefault();
        }



        //admin
        //product
        public int AddProduct(Product product)
        {
            context.Products.Add(product);
            return context.SaveChanges();
        }



        public int DeleteProduct(int productid)
        {
            Product product = context.Products.Find(productid);
            if (product == null)
            {
                return -1;
            }
            context.Products.Remove(product);
            return context.SaveChanges();

        }

        public int UpdateProduct(Product product)
        {
            Product newproduct = context.Products.Find(product.productID);
            if (newproduct == null)
            {
                return -1;
            }
            newproduct.name = product.name;
            newproduct.description = product.description;
            newproduct.price = product.price;
            newproduct.quantity = product.quantity;
            
            newproduct.categoryID = product.categoryID;

            return context.SaveChanges();
        }



        //admin
        //category
        public int AddCategory(Category category)
        {
            context.Categories.Add(category);
            return context.SaveChanges();
        }

        public int DeleteCategory(int categoryid)
        {
            Category category = context.Categories.Find(categoryid);
            if (category == null)
            {
                return -1;
            }
            context.Categories.Remove(category);
            return context.SaveChanges();
        }

        public int UpdateCategory(Category category)
        {
            Category newcategory = context.Categories.Find(category.categoryID);
            if (newcategory == null)
            {
                return -1;
            }
            newcategory.name = category.name;
            return context.SaveChanges();
        }


















    }
}
