using Newtonsoft.Json;
using SmartRetail_DAL;
using SmartRetail_Server.Filters;
using SmartRetail_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SmartRetail_Server.Controllers
{
    public class AdminController : ApiController
    {
        Repository repository;

        public AdminController() 
        {
            repository = new Repository();
        }


        [HttpPost]
        [Route("api/Admin/Login")]
        public string LoginAdmin([FromBody] LoginRequest loginRequest)
        {
            return repository.LoginAdmin(loginRequest.email, loginRequest.password);
        }

        [JwtAuthorize]
        [HttpPost]
        [Route("api/Admin/Details")]
        public Admin GetAdmin()
        {
            string email = User.Identity.Name;
            return repository.GetAdmin(email);
        }






        [JwtAuthorize]
        [HttpPost]


        public async Task<IHttpActionResult> AddProduct()
        {




            if (!Request.Content.IsMimeMultipartContent())
                return BadRequest("Unsupported media type.");

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            // Extract the JSON part
            var jsonPart = provider.Contents.FirstOrDefault(c => c.Headers.ContentType.MediaType == "application/json");
            if (jsonPart == null)
                return BadRequest("No JSON data found.");

            var jsonString = await jsonPart.ReadAsStringAsync();
            var productRequest = JsonConvert.DeserializeObject<Product>(jsonString);

            // Extract the file part
            var filePart = provider.Contents.FirstOrDefault(c => c.Headers.ContentDisposition.FileName != null);
            if (filePart == null)
                return BadRequest("No file uploaded.");

            var fileData = await filePart.ReadAsByteArrayAsync();
            var fileName = filePart.Headers.ContentDisposition.FileName.Trim('\"');

            var product = new Product
            {
                name = productRequest.name,
                description = productRequest.description,
                price = productRequest.price,
                quantity = productRequest.quantity,
                categoryID = productRequest.categoryID,
                imageUrl = fileName,
                imageUrlContent = fileData,

            };

            // Save product to database (SQL Server)
            repository.AddProduct(product);

            return Ok("File uploaded successfully.");


























            //if (repository.AddProduct(product) > 0)
            //{
            //    var message = Request.CreateResponse(HttpStatusCode.Created);

            //    //var email = User.Identity.Name;
            //    //var message = Request.CreateResponse(HttpStatusCode.Created, email);

            //    return (message);
            //}
            //else
            //{
            //    var message = Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Product Not Created"));
            //    return message;
            //}
        }

        [JwtAuthorize]
        [HttpDelete]
        public HttpResponseMessage DeleteProduct([FromBody] int productid)
        {
            if (repository.DeleteProduct(productid) > 0)
            {
                var message = Request.CreateResponse(HttpStatusCode.Accepted);
                return message;
            }
            else
            {
                var message = Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Product Not Deleted"));
                return message;
            }
        }


        [JwtAuthorize]
        [HttpPut]
        public HttpResponseMessage UpdateProduct(Product product)
        {
            if(repository.UpdateProduct(product) > 0)
            {
                var message = Request.CreateResponse(HttpStatusCode.Accepted);
                return message;
            }
            else
            {
                var message = Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Product Not Updated"));
                return message;
            }
        }



        //[HttpPost]
        //public HttpResponseMessage AddCategory(Category category)
        //{
        //    if (repository.AddCategory(category) > 0)
        //    {
        //        var message = Request.CreateResponse(HttpStatusCode.Created);
        //        return message;
        //    }
        //    else
        //    {
        //        var message = Request.CreateErrorResponse(HttpStatusCode.BadRequest, new Exception("Category Not Created"));
        //        return message;
        //    }
        //}


    }
}
