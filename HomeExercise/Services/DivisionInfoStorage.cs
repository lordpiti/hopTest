using System.Collections.Generic;

namespace HomeExercise.Services
{
    class DivisionInfoStorage : IDivisionInfoStorage
    {
        private static Dictionary<int, string> NotesStorage = new Dictionary<int, string>();

        public Dictionary<int, string> GetNotesStorage()
        {
            return NotesStorage;
        }
    }
}