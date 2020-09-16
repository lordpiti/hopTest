using HomeExercise.Models;
using HomeExercise.Models.ContractApiModel;
using HomeExercise.Proxy.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HomeExercise.Proxy
{
    public class VotesApiClient : BaseHttpClient, IVotesApiClient
    {
        private readonly VotesConfiguration votesConfig;

        /// <summary>
        /// Client for the external API
        /// Extends the base http base client class and uses its methods
        /// to make the calls
        /// </summary>
        /// <param name="httpClientFactory"></param>
        /// <param name="votesConfiguration"></param>
        public VotesApiClient(
            IHttpClientFactory httpClientFactory,
            VotesConfiguration votesConfiguration)
            : base(httpClientFactory)
        {
            this.votesConfig = votesConfiguration;
        }

        public async Task<IEnumerable<DivisionSearchResult>> GetAllDivisions(int skip, int take)
        {
            var divisionSearchUri = new Uri(this.votesConfig.VotesApiBaseUri, $"search?skip={skip}&take={take}");

            var response = await this.Get<IEnumerable<DivisionSearchResult>>(divisionSearchUri);

            return response;
        }

        public async Task<int> GetTotalResults()
        {
            var totalResultsUri = new Uri(this.votesConfig.VotesApiBaseUri, $"searchTotalResults");
            var response = await this.Get<int>(totalResultsUri);

            return response;
        }
    }
}
