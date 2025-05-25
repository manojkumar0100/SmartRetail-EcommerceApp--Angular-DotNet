using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SmartRetail_Server.Models
{
    public class LoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}