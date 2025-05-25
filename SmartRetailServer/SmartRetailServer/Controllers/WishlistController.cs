using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartRetail_DAL;
using SmartRetail_DAL.Models;
using SmartRetail_Server.Filters;



namespace SmartRetail_Server.Controllers
{
    public class WishlistController : ApiController
    {

        AuthController authController;
        Repository repository;
        public WishlistController() 
        {
            authController = new AuthController();
            repository = new Repository();
        }


        [HttpGet]
        [JwtAuthorize]
        public IEnumerable<WishlistDTO> GetWishlistProducts()
        {

            string email = User.Identity.Name;
            return repository.GetWishlistProducts(email);
        }



        [HttpDelete]
        [JwtAuthorize]
        public int DeleteWishlistProduct([FromBody] int productid)
        {
            int customerid = authController.GetCustomerID();
            return repository.DeleteWishlistProduct(customerid,productid);
        }


        [HttpPost]
        [JwtAuthorize]
        public int AddWishlistProduct([FromBody] int productid)
        {
            Wishlist wishlist = new Wishlist();
            int id = authController.GetCustomerID();


            wishlist.customerID = id; 
            wishlist.productID = productid;
            wishlist.dateAdded = DateTime.Now;
            return repository.AddWishlistProduct(wishlist);
        }


        [HttpPost]
        [JwtAuthorize]
        [Route("api/Wishlist/Check")]
        public bool CheckWishlistProduct([FromBody] int productid)
        {
            int customerid = authController.GetCustomerID();
            return repository.CheckWishlistProduct(customerid, productid);
        }



    }
}
