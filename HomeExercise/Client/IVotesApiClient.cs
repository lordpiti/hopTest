using HomeExercise.Models;
using HomeExercise.Models.ContractApiModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExercise.Proxy
{
    public interface IVotesApiClient
    {
        Task<IEnumerable<DivisionSearchResult>> GetAllDivisions(int skip, int take);

        Task<int> GetTotalResults();
    }
}
