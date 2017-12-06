using System.Web.Http;

namespace Spv.Tools.GithubEnterpriseWebhooks.Host.OwinSelfHostExperiment
{
    public class WebApiConfig
    {
        public static HttpConfiguration Register()
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            return config;
        }
    }
}