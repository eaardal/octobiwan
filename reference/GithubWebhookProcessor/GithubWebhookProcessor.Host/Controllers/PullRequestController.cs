using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Spv.Tools.GithubWebhooks.Host.Controllers
{
    public class PullRequestController : ApiController
    {
        [Route("api/pullrequesthook")]
        [HttpPost]
        public async Task<IHttpActionResult> PullRequestHook(GitHubPullRequestModel model)
        {
            var organizationName = model.repository.full_name.Split('/')[0];
            var validOrganizations = new[] { "afs", "integral", "ipa", "informasjonsstyring" };
            if (!validOrganizations.Contains(organizationName))
            {
                return BadRequest($"Unknown organization {organizationName}");
            }
            var httpClient = new HttpClient();
            if (!(model.action == "opened" || model.action == "reopened" || model.action == "closed")) return Ok("Only accepts opened or reopned");
            var channel = GetChannel(organizationName);
            var content = GetPayload(model, channel);
            var serializeSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var serializedContent = JsonConvert.SerializeObject(content, serializeSettings);
            var stringContent = new StringContent(serializedContent, Encoding.UTF8, @"application/json");
            var slackWebhook = ConfigurationManager.AppSettings["slackwebhook"];
            var result = await
                httpClient.PostAsync(
                    slackWebhook,
                    stringContent);
            if (result.StatusCode != HttpStatusCode.OK)
            {
                return InternalServerError();
            }
            return Ok();
        }

        private static string GetChannel(string organizationName)
        {
            switch (organizationName)
            {
                case "afs":
                    return "#afs-pullrequests";
                case "ipa":
                    return "#ipa-pullrequests";
                case "integral":
                    return "#integral-pullrequests";
                case "informasjonsstyring":
                    return "#infostyring_test";
                default:
                    return "";
            }
        }

        private static Payload GetPayload(GitHubPullRequestModel model, string channel)
        {
            var content = new Payload();
            // Bruk mergekey for å indikere om den er meget eller ei
            if (model.action == "closed")
            {
                var closedText = "Lukket";
                if (model.pull_request.merged)
                {
                    closedText += " & merget";
                }
                content.Text =
                    $@"<!here> {closedText} <{model.pull_request.html_url}|pullrequest> på <{model.repository.html_url}|{model
                        .repository.name}> - ""{model.pull_request.title}"" - <{model.pull_request.html_url}|{model.pull_request
                            .number}>";
            }
            else
            {
                content.Text =
                    $@"<!here> Ny <{model.pull_request.html_url}|pullrequest> på <{model.repository.html_url}|{model.repository
                        .name}> - ""{model.pull_request.title}"" - <{model.pull_request.html_url}|{model.pull_request.number}>";

            }
            content.Channel = channel;
            return content;
        }
    }
}