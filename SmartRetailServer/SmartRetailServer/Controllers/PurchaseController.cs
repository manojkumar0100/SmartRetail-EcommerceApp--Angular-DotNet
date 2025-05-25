using SmartRetail_DAL;
using SmartRetail_DAL.Models;
using SmartRetail_Server.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Transactions;

namespace SmartRetail_Server.Controllers
{





    public class PurchaseController : ApiController
    {
        Repository repository;

        AuthController authController;

        CartController cartController;

        public PurchaseController()
        {
            repository = new Repository();
            authController = new AuthController();
            cartController = new CartController();

        }


        [HttpPost]
        [JwtAuthorize]
        public int AddPurchaseItems(string address)
        {
            //using (var scope = new TransactionScope())
            //{
            //    try
            //    {

            string email = User.Identity.Name;
            int customerID = authController.GetCustomerID();
            IEnumerable<CartDTO> cartDTOs = cartController.GetCartProducts();


            //adding order record
            Order order = new Order();
            order.orderDate = DateTime.Now;
            order.address = address;
            order.orderStatus = "processing";
            order.customerID = customerID;
            order.orderID = repository.AddOrder(order);

            decimal totalprice = 0;


            //adding orderitems records
            foreach (CartDTO cartDTO in cartDTOs)
            {
                OrderItem orderItem = new OrderItem();
                orderItem.quantity = cartDTO.productQuantity;
                orderItem.price = repository.GetProductPrice(cartDTO.productID);
                totalprice += (orderItem.price * orderItem.quantity);
                orderItem.productID = cartDTO.productID;
                orderItem.orderID = order.orderID;
                repository.AddOrderItem(orderItem);
            }


            //adding payment record
            Payment payment = new Payment();
            payment.paymentDate = DateTime.Now;
            payment.paymentStatus = "success";
            payment.amount = totalprice + (decimal)(totalprice * 15) / (decimal)100;
            if (totalprice < 1000)
            {
                payment.amount += 70;
            }
            else
            {
                payment.amount += 25;
            }



            payment.orderID = order.orderID;
            repository.AddPayment(payment);





            //adding invoice record
            Invoice invoice = new Invoice();
            invoice.invoiceDate = DateTime.Now;
            invoice.totalAmount = totalprice;
            invoice.taxAmount = (decimal)(totalprice * 15) / (decimal)100;
            if (totalprice >= 1000)
            {
                invoice.shippingCost = 25;
            }
            else
            {
                invoice.shippingCost = 70;
            }
            invoice.orderID = order.orderID;
            repository.AddInvoice(invoice);
            return repository.DeleteCartProducts(email);

            //    }
            //    catch (Exception ex)
            //    {

            //    }
            //}












        }


    }
}
