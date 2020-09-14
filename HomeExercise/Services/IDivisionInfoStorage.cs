using System.Collections.Generic;

namespace HomeExercise.Services
{
    public interface IDivisionInfoStorage
    {
        Dictionary<int, string> GetNotesStorage();
    }
}