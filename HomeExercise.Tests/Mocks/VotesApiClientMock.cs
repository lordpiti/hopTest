using HomeExercise.Models.ContractApiModel;
using HomeExercise.Proxy;
using HomeExercise.Tests.Helpers;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExercise.Tests.Mocks
{t
    public class VotesApiClientMock : Mock<IVotesApiClient>
    {
        private const string divisionApiResultJsonFile = "HomeExercise.Tests.Mocks.json.divisions.json";

        public VotesApiClientMock(MockBehavior behavior = MockBehavior.Default)
            : base(behavior)
        {
        }

        public VotesApiClientMock GetAllDivisionsAndTotalResultsReturnsResponses()
        {
            // To avoid writing manual code to create the result object, i provide a json file which
            // is included as en embedded resource in the project and just deserialise it using a helper 
            // method that i also implemented
            var divisionSearchResult = TestHelpers.ParseJsonFromEmbeddedResource<IEnumerable<DivisionSearchResult>>(divisionApiResultJsonFile);

            this.Setup(client => client.GetAllDivisions(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult(divisionSearchResult));
            this.Setup(client => client.GetTotalResults()).Returns(Task.FromResult(100));

            return this;
        }

        public VotesApiClientMock GetAllDivisionsReturnsValidResponseAndTotalResultsThrowsException()
        {
            var divisionSearchResult = TestHelpers.ParseJsonFromEmbeddedResource<IEnumerable<DivisionSearchResult>>(divisionApiResultJsonFile);

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
