using System;
using Topshelf;

namespace Spv.Tools.GithubEnterpriseWebhooks.Host.OwinSelfHostExperiment
{
    class Program
    {
        static void Main(string[] args)
        {
            HostFactory.Run(x =>
            {
                x.Service<HostingConfiguration>();
                x.SetStartTimeout(TimeSpan.FromMinutes(1));
                x.SetStopTimeout(TimeSpan.FromMinutes(1));
                x.RunAsLocalSystem();
                x.StartAutomatically();
            });
        }
    }
}
