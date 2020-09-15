using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExercise.Models
{
    public class DivisionItem
    {
        public int DivisionId { get; set; }

        public string Title { get; set; }

        public int AyesCount { get; set; }

        public int NoesCount { get; set; }

        public string Note { get; set; }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;

            DivisionItem other = (DivisionItem)obj;

            return Title.Equals(other.Title)
                && DivisionId.Equals(other.DivisionId)
                && AyesCount.Equals(other.AyesCount)
                && NoesCount.Equals(other.NoesCount)
                && Note.Equals(other.Note);
        }

        public override int GetHashCode()
        {
            return new { DivisionId, Title, AyesCount, NoesCount, Note }.GetHashCode();
        }
    }
}
