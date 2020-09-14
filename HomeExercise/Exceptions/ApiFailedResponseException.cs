using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HomeExercise.Exceptions
{
    public class ApiFailedResponseException : Exception
    {
        public ApiFailedResponseException(Uri requestUri, string httpResponseContent, HttpStatusCode responseStatusCode)
        : base($"Calling {requestUri} errored with response status code {responseStatusCode}")
        {
            this.RequestUri = requestUri;
            this.ResponseContent = httpResponseContent;
            this.ResponseStatusCode = responseStatusCode;
        }

        public Uri RequestUri { get; }

        public string ResponseContent { get; }

        public HttpStatusCode? ResponseStatusCode { get; }
    }
}
