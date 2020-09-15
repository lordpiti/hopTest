using HomeExercise.Models;
using HomeExercise.Services;
using HomeExercise.Tests.Helpers;
using HomeExercise.Tests.Mocks;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace HomeExercise.Tests
{
    public class DivisionInfoTests
    {
        private DivisionInfoService _divisionsService;

        public DivisionInfoTests()
        {
            // Used the Moq nuget package to create the mocked services to be injected in the tested class
            _divisionsService = new DivisionInfoService(new DivisionInfoStorageMock().GetStorageWithOneNote().Object,
                new VotesApiClientMock().GetAllDivisionsAndTotalResultsReturnsResponses().Object);
        }

        [Fact]
        public async void GetDivisionPage_ReturnsData_WhenApiCallsAreSuccesful()
        {
            // To avoid writing manual code to create the expected result object, i provide a json file which
            // is included as en embedded resource in the project and just deserialise it using a helper 
            // method that i also implemented
            const string expectedDivisionFile = "HomeExercise.Tests.Mocks.json.expectedDivision.json";

            var expectedResult = TestHelpers.ParseJsonFromEmbeddedResource<IEnumerable<DivisionItem>>(expectedDivisionFile);

            var divisionData = await _divisionsService.GetDivisionPage(1, 2);

            Assert.Equal(100, divisionData.NumberOfItems);
            Assert.Equal(expectedResult, divisionData.DivisionItems);
        }

        [Fact]
        public async void GetDivisionPage_ThrowsException_WhenTotalSearchResultsApiCallFails()
        {
            this._divisionsService = new DivisionInfoService(new DivisionInfoStorageMock().GetStorageWithOneNote().Object,
                new VotesApiClientMock().GetAllDivisionsReturnsValidResponseAndTotalResultsThrowsException().Object);

            await Assert.ThrowsAsync<Exceptions.ApiFailedResponseException>(() => _divisionsService.GetDivisionPage(1, 2));
        }

        [Fact]
        public async void GetDivisionPage_ThrowsException_WhenSearchResultsApiCallFails()
        {
            this._divisionsService = new DivisionInfoService(new DivisionInfoStorageMock().GetStorageWithOneNote().Object,
                new VotesApiClientMock().GetAllDivisionsThrowsExceptionAndTotalResultsReturnsValidResponse().Object);

            await Assert.ThrowsAsync<Exceptions.ApiFailedResponseException>(() => _divisionsService.GetDivisionPage(1, 2));
        }
    }
}
