using HomeExercise.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExercise.Proxy.Configuration
{
    /// <summary>
    /// Configuration class to be used with the VotesApiClient
    /// It gets the settings from the config file and they are injected
    /// via the constructor
    /// </summary>
    public class VotesConfiguration
    {

        public VotesConfiguration(IOptions<AppSettings> apiSettings)
        {
            this.VotesApiBaseUri = new Uri(apiSettings?.Value.VotesApiBaseUri);
        }

        public Uri VotesApiBaseUri { get; }
    }
    
}
