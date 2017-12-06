using System;
using Microsoft.Owin.Hosting;
using Topshelf;

namespace Spv.Tools.GithubEnterpriseWebhooks.Host.OwinSelfHostExperiment
{
    public class HostingConfiguration : ServiceControl
    {
        private IDisposable _webApplication;

        public bool Start(HostControl hostControl)
        {
            _webApplication = WebApp.Start<OwinConfiguration>("http://localhost:85");
            return true;
        }

        public bool Stop(HostControl hostControl)
        {
            _webApplication.Dispose();
            return true;
        }
    }
}