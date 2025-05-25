using SmartRetail_DAL.Models;
using SmartRetail_DAL;
using SmartRetail_Server.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartRetail_Server.Models;

namespace SmartRetail_Server.Controllers
{
    public class CartController : ApiController
    {
        AuthController authController;
        Repository repository;
        public CartController()
        {
            authController = new AuthController();
            repository = new Repository();
        }


        [HttpGet]
        [JwtAuthorize]
        public IEnumerable<CartDTO> GetCartProducts()
        {
            string email = User.Identity.Name;
            return repository.GetCartProducts(email);
        }


        [HttpDelete]
        [JwtAuthorize]
        [Route("api/Cart/Delete")]
        public int DeleteCartProduct([FromBody] int cartid)
        {
            return repository.DeleteCartProduct(cartid);
        }

        [HttpDelete]
        [JwtAuthorize]
        [Route("api/Cart/DeleteAll")]
        public int DeleteCartProducts()
        {
            string email = User.Identity.Name;
            return repository.DeleteCartProducts(email);
        }

        [HttpPut]
        [JwtAuthorize]
        [Route("api/Cart/Put/Inc")]
        public int IncCartQty([FromBody] int cartid)
        {
            return repository.IncCartQty(cartid);
        }

        [HttpPut]
        [JwtAuthorize]
        [Route("api/Cart/Put/Dec")]
        public int DecCartQty([FromBody] int cartid)
        {
            return repository.DecCartQty(cartid);
        }


        [HttpPost]
        [JwtAuthorize]
        public int AddCartProduct([FromBody] CartProductModel cartProductModel)
        {
            Cart cartproduct = new Cart();
            int id = authController.GetCustomerID();


            cartproduct.customerID = id;
            cartproduct.productID = cartProductModel.productID;
            cartproduct.dateAdded = DateTime.Now;
            cartproduct.productQuantity = cartProductModel.quantity;
            return repository.AddCartProduct(cartproduct);
        }





    }
}
