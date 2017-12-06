using System.Web.Http;
using Owin;

namespace Spv.Tools.GithubEnterpriseWebhooks.Host.OwinSelfHostExperiment
{
    public class OwinConfiguration
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();
            config.Routes.MapHttpRoute("DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
            );
            appBuilder.UseWebApi(WebApiConfig.Register());
        }
    }
}