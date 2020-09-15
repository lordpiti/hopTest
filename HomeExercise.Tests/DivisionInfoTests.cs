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
            _divisionsService = new DivisionInfoService(new DivisionInfoStorageMock().GetStorageWithOneNote().Object,
                new VotesApiClientMock().GetAllDivisionsAndTotalResultsReturnsResponses().Object);
        }

        [Fact]
        public async void GetDivisionPage_ReturnsData_WhenApiCallsAreSuccesful()
        {
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
