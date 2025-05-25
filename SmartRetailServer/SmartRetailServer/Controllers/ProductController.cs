using SmartRetail_DAL;
using SmartRetail_Server.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartRetail_DAL.Models;


namespace SmartRetail_Server.Controllers
{
    public class ProductController : ApiController
    {
        Repository repository;

        AuthController authController;

        public ProductController()
        {
            repository = new Repository();
            authController = new AuthController();
        }



        
        [HttpGet]
        public IEnumerable<ProductDTO> GetProducts()
        {
            
            return repository.GetProducts();
        }


        [HttpPost]
        [JwtAuthorize]
        [Route("api/Review")]
        public int AddProductReview(ReviewDTO reviewdto)
        {
            Review review = new Review();
            review.rating = reviewdto.rating;
            review.comment = reviewdto.comment;
            review.productID = reviewdto.productID;
            review.reviewDate = DateTime.Now;
            review.customerID = authController.GetCustomerID();
            return repository.AddProductReview(review);
        }

        [HttpGet]
        [Route("api/Review")]
        public List<ReviewDTO> GetProductReviews(int productid)
        {
            return repository.GetProductReviews(productid);
        }


        [HttpGet]
        [Route("api/Ordered")]
        [JwtAuthorize]
        public bool CheckProductOrdered(int productid)
        {
            
            int customerid = authController.GetCustomerID();
            return repository.CheckProductOrdered(productid, customerid);

        }




    }
}
