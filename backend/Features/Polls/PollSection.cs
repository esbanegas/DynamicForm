using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Polls
{
    public class PollSection : Entity
    {
        public int PollSectionId  {get;set;}
        public int PollId { get; set; }
        public string SectionTitle { get; set; }

        public virtual ICollection<PollQuestion> PollQuestions{get;set;}
        public virtual Poll Poll {get;set;}
    }
}
