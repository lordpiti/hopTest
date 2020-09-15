using System.Linq;
using System.Threading.Tasks;
using HomeExercise.Models;
using HomeExercise.Proxy;

namespace HomeExercise.Services
{
    class DivisionInfoService : IDivisionInfoService
    {
        private readonly IDivisionInfoStorage _storage;
        private readonly IVotesApiClient _votesApiClient;

        public DivisionInfoService(IDivisionInfoStorage storage, IVotesApiClient votesApiClient)
        {
            _storage = storage;
            _votesApiClient = votesApiClient;
        }

        public DivisionInfoService(IDivisionInfoStorage storage)
        {
            _storage = storage;
        }

        public async Task<DivisionInformation> GetDivisionPage(int skip, int take)
        {
            var divisionResponseItems = await _votesApiClient.GetAllDivisions(skip, take);

            var divisionInformation = divisionResponseItems.Select(x => new DivisionItem()
            {
                AyesCount = x.AyeCount,
                DivisionId = x.DivisionId,
                NoesCount = x.NoCount,
                Title = x.Title,
                Note = NotesForDivisionExist(x.DivisionId)?GetNotesForDivision(x.DivisionId) : string.Empty
            });

            var divisionCount = await _votesApiClient.GetTotalResults();

            return new DivisionInformation() {
                DivisionItems = divisionInformation,
                NumberOfItems = divisionCount
            };
        }

        public void SaveNotesForDivision(int divisionId, string notes)
        {
            if (NotesForDivisionExist(divisionId))
            {
                _storage.GetNotesStorage()[divisionId] = notes;
            }
            else
            {
                _storage.GetNotesStorage().Add(divisionId, notes);
            }
        }

        public bool NotesForDivisionExist(int divisionId)
        {
            return _storage.GetNotesStorage().ContainsKey(divisionId);
        }

        public string GetNotesForDivision(int divisionId)
        {
            if (!NotesForDivisionExist(divisionId))
            {
                return null;
            }

            return _storage.GetNotesStorage()[divisionId];
        }
    }
}