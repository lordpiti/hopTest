using HomeExercise.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace HomeExercise.Tests.Mocks
{
    public class DivisionInfoStorageMock : Mock<IDivisionInfoStorage>
    {
        public DivisionInfoStorageMock(MockBehavior behavior = MockBehavior.Default): base(behavior)
        {
        }


        public DivisionInfoStorageMock GetStorageWithOneNote()
        {
            var notesDictionary = new Dictionary<int, string>();
            notesDictionary[834] = "test1";

            this.Setup(client => client.GetNotesStorage())
                .Returns(notesDictionary);

            return this;
        }
    }
}
