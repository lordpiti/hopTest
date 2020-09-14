using HomeExercise.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExercise.Proxy.Configuration
{
    public class VotesConfiguration
    {

        public VotesConfiguration(IOptions<AppSettings> apiSettings)
        {
            this.VotesApiBaseUri = new Uri(apiSettings?.Value.VotesApiBaseUri);
        }

        public Uri VotesApiBaseUri { get; }
    }
    
}
