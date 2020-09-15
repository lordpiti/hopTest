using HomeExercise.Services;
using System.Collections.Generic;
using Xunit;

namespace HomeExercise.Tests
{
    public class DivisionNotesTest
    {
        private DivisionInfoService _divisionsService;

        public DivisionNotesTest()
        {
            _divisionsService = new DivisionInfoService(new TestStorage());
        }

        [Fact]
        public void Notes_Are_Stored()
        {
            _divisionsService.SaveNotesForDivision(1, "test notes");
            
            Assert.True(_divisionsService.NotesForDivisionExist(1));
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
