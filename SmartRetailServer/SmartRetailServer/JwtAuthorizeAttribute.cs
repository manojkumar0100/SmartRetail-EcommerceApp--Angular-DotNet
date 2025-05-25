using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Microsoft.IdentityModel.Tokens;

namespace SmartRetail_Server.Filters
{
    public class JwtAuthorizeAttribute : AuthorizationFilterAttribute
    {
        private const string Secret = "db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==";

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var authHeader = actionContext.Request.Headers.Authorization;
            Console.WriteLine(authHeader);
            if (authHeader == null || authHeader.Scheme != "Bearer")
            {
                //Console.WriteLine("Authorization header: " + authHeader.ToString());
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "Missing or invalid token");
                return;
            }

            var token = authHeader.Parameter;
            
            if (ValidateToken(token, out string username))
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, username) };
                var identity = new ClaimsIdentity(claims, "Jwt");
                var principal = new ClaimsPrincipal(identity);
                actionContext.RequestContext.Principal = principal;
            }
            else
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "Invalid token");
            }
        }

        private bool ValidateToken(string token, out string username)
        {
            username = null;

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(Secret))
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                var identity = principal.Identity as ClaimsIdentity;

                if (identity == null || !identity.IsAuthenticated)
                    return false;

                var usernameClaim = identity.FindFirst(ClaimTypes.Name);
                username = usernameClaim?.Value;

                return !string.IsNullOrEmpty(username);
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                // Example: Log.Error("Token validation failed", ex);
                return false;
            }
        }
    }
}