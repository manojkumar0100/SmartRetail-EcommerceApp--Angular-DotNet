using SmartRetail_DAL;
using SmartRetail_DAL.Models;
using SmartRetail_Server.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmartRetail_Server.Controllers
{
    public class OrderController : ApiController
    {
        AuthController authController;

        Repository repository;
        public OrderController() { repository = new Repository(); authController = new AuthController(); }


        [HttpGet]
        [JwtAuthorize]
        [Route("api/Orders")]
        public IEnumerable<OrderDTO> GetOrders()
        {
            int customerid = authController.GetCustomerID();
            return repository.GetOrders(customerid);
        }


        [HttpGet]
        [JwtAuthorize]
        [Route("api/Invoice")]
        public InvoiceDTO GetInvoice(int orderid)
        {
            return repository.GetInvoice(orderid);
        }



    }
}
