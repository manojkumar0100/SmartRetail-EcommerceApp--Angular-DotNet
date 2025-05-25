using System.Web.Http;
using WebActivatorEx;
using SmartRetail_Server;
using Swashbuckle.Application;
using System.Web.Http.Description;
using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Linq;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace SmartRetail_Server
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                    {
                        c.SingleApiVersion("v1", "SmartRetail_Server");
                        c.OperationFilter<AddAuthorizationHeaderParameterOperationFilter>();



                    })
                .EnableSwaggerUi(c =>
                    {
                        
                     
                    });
        }
    }

    public class AddAuthorizationHeaderParameterOperationFilter : IOperationFilter
    {
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.parameters == null)
                operation.parameters = new List<Parameter>();

            operation.parameters.Add(new Parameter
            {
                name = "Authorization",
                @in = "header",
                type = "string",
                required = false,
                description = "Bearer token"
            });
        }
    }
}
