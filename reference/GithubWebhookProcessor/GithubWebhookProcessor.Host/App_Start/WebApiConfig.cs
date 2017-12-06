using System.Web.Http;

namespace Spv.Tools.GithubWebhooks.Host
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
        }
    }
}
