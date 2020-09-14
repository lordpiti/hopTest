using System.Collections;
using System.Collections.Generic;

namespace HomeExercise.Models
{
    public class DivisionInformation
    {
        public IEnumerable<DivisionItem> DivisionItems { get; set; }

        public int NumberOfItems { get; set; }
    }
}