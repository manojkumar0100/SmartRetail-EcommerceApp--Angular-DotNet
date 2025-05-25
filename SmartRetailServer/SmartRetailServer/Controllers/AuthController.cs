using Microsoft.Owin.Security;
using SmartRetail_DAL;
using SmartRetail_Server.Filters;
using SmartRetail_Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartRetail_DAL.Models;

namespace SmartRetail_Server.Controllers
{
    public class AuthController : ApiController
    {
        Repository repository;

        public AuthController()
        {
            repository = new Repository();
        }

        [HttpPost]
        [Route("api/Auth/Login")]
        public string LoginCustomer([FromBody] LoginRequest loginRequest)
        {
            return repository.LoginCustomer(loginRequest.email, loginRequest.password);
        }

        [HttpPost]
        [Route("api/Auth/User")]
        [JwtAuthorize]
        public string GetCustomerFirstName()
        {
            string email = User.Identity.Name;
            return repository.GetCustomer(email).firstName;
        }

        [HttpGet]
        [Route("api/Auth/User/Details")]
        [JwtAuthorize]
        public CustomerDTO GetCustomer()
        {
            string email = User.Identity.Name;
            Customer customer = repository.GetCustomer(email);
            CustomerDTO customerDTO = new CustomerDTO(customer.customerID,customer.firstName,customer.lastName,customer.email,customer.password,customer.phoneNumber);
            return customerDTO;
        }

        [HttpGet]
        [Route("api/Auth/User/ID")]
        [JwtAuthorize]
        public int GetCustomerID()
        {
            string email = User.Identity.Name;
            return repository.GetCustomer(email).customerID;
        }


        [HttpPut]
        [Route("api/Auth/User/Profile")]
        [JwtAuthorize]
        public int UpdateCustomer([FromBody] Customer customer)
        {
            string email = User.Identity.Name;
            customer.customerID = GetCustomerID();
            return repository.UpdateProfile(customer);
        }



        [HttpPut]
        [Route("api/Auth/User/Password")]
        [JwtAuthorize]
        public int UpdatePassword([FromBody] PasswordModel passwordmodel)
        {
            string email = User.Identity.Name;
            Customer customer = repository.GetCustomer(email);
            customer.password = passwordmodel.password;
            return repository.UpdatePassword(customer);
        }











        [HttpPost]
        [Route("api/Auth/Register")]
        public string RegisterCustomer([FromBody] Customer customer)
        {
            return repository.RegisterCustomer(customer);
        }





    }
}
