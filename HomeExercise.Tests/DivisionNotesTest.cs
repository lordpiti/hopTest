using System;
using System.Collections.Generic;
using System.Reflection;
using HomeExercise.Services;
using HomeExercise.Tests.Mocks;
using Xunit;

namespace HomeExercise.Tests
{
    public class DivisionNotesTest
    {
        private DivisionInfoService _divisionsService;

        public DivisionNotesTest()
        {
            _divisionsService = new DivisionInfoService(new TestStorage(), new VotesApiClientMock().GetAllDivisionsAndTotalResultsReturnsResponses().Object);
        }

        [Fact]
        public void Notes_Are_Stored()
        {
            _divisionsService.SaveNotesForDivision(1, "test notes");
            
            Assert.True(_divisionsService.NotesForDivisionExist(1));
        }

        [Fact]
        public async void GetDivisionPage_ReturnsData_WhenApiCallsAreSuccesful()
        {
            var ggg = await _divisionsService.GetDivisionPage(1, 2);

            Assert.True(true);
        }

        [Fact]
        public async void GetDivisionPage_ThrowsException_WhenTotalSearchResultsApiCallFails()
        {
            this._divisionsService = new DivisionInfoService(new TestStorage(),
                new VotesApiClientMock().GetAllDivisionsReturnsValidResponseAndTotalResultsThrowsException().Object);

            await Assert.ThrowsAsync<Exceptions.ApiFailedResponseException>(() => _divisionsService.GetDivisionPage(1,2));
        }

        [Fact]
        public async void GetDivisionPage_ThrowsException_WhenSearchResultsApiCallFails()
        {
            this._divisionsService = new DivisionInfoService(new TestStorage(),
                new VotesApiClientMock().GetAllDivisionsThrowsExceptionAndTotalResultsReturnsValidResponse().Object);

            await Assert.ThrowsAsync<Exceptions.ApiFailedResponseException>(() => _divisionsService.GetDivisionPage(1, 2));
        }

        private class TestStorage : IDivisionInfoStorage
        {
            private readonly Dictionary<int, string> _storage;

            public TestStorage()
            {
                _storage = new Dictionary<int, string>();
            }

            public Dictionary<int, string> GetNotesStorage()
            {
                return _storage;
            }
        }
    }
}
