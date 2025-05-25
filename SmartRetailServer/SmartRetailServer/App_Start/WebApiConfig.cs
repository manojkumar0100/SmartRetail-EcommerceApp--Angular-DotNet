using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;


namespace SmartRetail_Server
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

        }
    }
}

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web.Http;
//using Microsoft.Owin.Security.OAuth;
//using Microsoft.Owin.Security.Jwt;
//using Microsoft.Owin.Security;
//using System.IdentityModel.Tokens.Jwt;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using System.Web.Http.Owin;
//using System.Net.Http;
//using System.Threading.Tasks;
//using System.Threading;
//using System.Web;

//namespace SmartRetail_Server
//{
//    public static class WebApiConfig
//    {
//        public static void Register(HttpConfiguration config)
//        {
//            // Web API configuration and services

//            // Web API routes
//            config.MapHttpAttributeRoutes();

//            config.Routes.MapHttpRoute(
//                name: "DefaultApi",
//                routeTemplate: "api/{controller}/{id}",
//                defaults: new { id = System.Web.Http.RouteParameter.Optional } // Explicitly specify the namespace
//            );

//            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

//            config.Filters.Add(new AuthorizeAttribute());

//            // JWT Authentication Configuration
//            var key = Convert.FromBase64String("db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==");
//            var issuer = "yourIssuer";
//            var audience = "yourAudience";

//            config.SuppressDefaultHostAuthentication();
//            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

//            var tokenValidationParameters = new TokenValidationParameters
//            {
//                ValidateIssuer = true,
//                ValidIssuer = issuer,
//                ValidateAudience = true,
//                ValidAudience = audience,
//                ValidateIssuerSigningKey = true,
//                IssuerSigningKey = new SymmetricSecurityKey(key),
//                ValidateLifetime = true
//            };

//            config.MessageHandlers.Add(new JwtMessageHandler(tokenValidationParameters));
//        }
//    }

//    public class JwtMessageHandler : DelegatingHandler
//    {
//        private readonly TokenValidationParameters _tokenValidationParameters;

//        public JwtMessageHandler(TokenValidationParameters tokenValidationParameters)
//        {
//            _tokenValidationParameters = tokenValidationParameters;
//        }

//        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
//        {
//            var token = request.Headers.Authorization?.Parameter;
//            if (token != null)
//            {
//                var tokenHandler = new JwtSecurityTokenHandler();
//                try
//                {
//                    var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out _);
//                    Thread.CurrentPrincipal = principal;
//                    HttpContext.Current.User = principal;
//                }
//                catch (Exception)
//                {
//                    // Token validation failed
//                }
//            }

//            return await base.SendAsync(request, cancellationToken);
//        }
//    }
//}