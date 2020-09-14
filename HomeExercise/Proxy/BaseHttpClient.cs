using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace HomeExercise.Proxy
{
    public abstract class BaseHttpClient
    {
        public const string JsonMediaType = "application/json";

        protected BaseHttpClient(IHttpClientFactory httpClientFactory)
        {
            this.HttpClientFactoryInstance = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        }

        private HttpClient HttpClientInstance
        {
            get
            {
                var httpClient = this.HttpClientFactoryInstance.CreateClient();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(JsonMediaType));
                return httpClient;
            }
        }

        private IHttpClientFactory HttpClientFactoryInstance { get; }

        protected async Task<TResponse> Get<TResponse>(Uri uri)
        {
            var response = await this.HttpClientInstance.GetAsync(uri);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {   
                throw new Exceptions.ApiFailedResponseException(uri, responseContent, response.StatusCode);
            }

            var responseObject = JsonConvert.DeserializeObject<TResponse>(responseContent);

            return responseObject;
        }
    }
}
