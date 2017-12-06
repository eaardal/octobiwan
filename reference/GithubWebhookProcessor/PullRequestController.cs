using System.Web.Http;

namespace Spv.Tools.GithubEnterpriseWebhooks.Host.OwinSelfHostExperiment
{
    [RoutePrefix("api")]
    public class PullRequestController : ApiController
    {
        [Route("test")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok();
        }
    }
}