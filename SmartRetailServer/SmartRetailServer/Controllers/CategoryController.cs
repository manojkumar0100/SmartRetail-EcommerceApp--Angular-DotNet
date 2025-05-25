using SmartRetail_DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartRetail_DAL.Models;

namespace SmartRetail_Server.Controllers
{
    public class CategoryController : ApiController
    {
        Repository repository;

        public CategoryController()
        {
            repository = new Repository();
        }

        


        [HttpGet]
        public IEnumerable<CategoryDTO> GetCategories()
        {
            return repository.GetCategories();
        }
    }
}
