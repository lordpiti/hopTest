using HomeExercise.Models.ContractApiModel;
using HomeExercise.Proxy;
using HomeExercise.Tests.Helpers;
using Microsoft.VisualBasic.CompilerServices;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HomeExercise.Tests.Mocks
{
    public class VotesApiClientMock : Mock<IVotesApiClient>
    {
        public VotesApiClientMock(MockBehavior behavior = MockBehavior.Default)
            : base(behavior)
        {
        }

        public VotesApiClientMock GetAllDivisionsAndTotalResultsReturnsResponses()
        {
            string votesApiJson = string.Empty;
            const string productMetricsSetJsonFile = "HomeExercise.Tests.Mocks.json.divisions.json";

            var divisionSearchResult = TestHelpers.ParseJsonFromEmbeddedResource<IEnumerable<DivisionSearchResult>>(productMetricsSetJsonFile);

            this.Setup(client => client.GetAllDivisions(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(divisionSearchResult));
            this.Setup(client => client.GetTotalResults()).Returns(Task.FromResult(100));

            return this;
        }

        public VotesApiClientMock GetAllDivisionsReturnsValidResponseAndTotalResultsThrowsException()
        {
            string votesApiJson = string.Empty;
            const string productMetricsSetJsonFile = "HomeExercise.Tests.Mocks.json.divisions.json";

            var divisionSearchResult = TestHelpers.ParseJsonFromEmbeddedResource<IEnumerable<DivisionSearchResult>>(productMetricsSetJsonFile);

            this.Setup(client => client.GetAllDivisions(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(divisionSearchResult));

            this.Setup(client =>
                    client.GetTotalResults())
                .Throws(new Exceptions.ApiFailedResponseException(null, null, System.Net.HttpStatusCode.InternalServerError));

            return this;
        }

        public VotesApiClientMock GetAllDivisionsThrowsExceptionAndTotalResultsReturnsValidResponse()
        {
            this.Setup(client => client.GetAllDivisions(It.IsAny<int>(), It.IsAny<int>()))
                .Throws(new Exceptions.ApiFailedResponseException(null, null, System.Net.HttpStatusCode.InternalServerError));           

            this.Setup(client =>
                    client.GetTotalResults())
                .Returns(Task.FromResult(100));

            return this;
        }
    }
}
