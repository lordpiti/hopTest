using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExercise.Models.ContractApiModel
{
    public class DivisionSearchResult
    {
        public int DivisionId { get; set; }

        public string Date { get; set; }

        public string PublicationUpdated { get; set; }

        public int? Number { get; set; }

        public bool? IsDeferred { get; set; }

        public string EVELType { get; set; }

        public string EVELCountry { get; set; }

        public string Title { get; set; }

        public int AyeCount { get; set; }

        public int NoCount { get; set; }

        public int? DoubleMajorityAyeCount { get; set; }

        public int? DoubleMajorityNoCount { get; set; }

        public string FriendlyDescription { get; set; }

        public string FriendlyTitle { get; set; }
        public string RemoteVotingStart { get; set; }
        public string RemoteVotingEnd { get; set; }
    }
}
