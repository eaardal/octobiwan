namespace Spv.Tools.GithubWebhooks.Host.Controllers
{
    public class Payload
    {
        public string Text { get; set; }
        public string Channel { get; set; }
        public string Username => "GithubBot";
    }
}