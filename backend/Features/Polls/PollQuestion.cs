using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Polls
{
    public class PollQuestion : Entity
    {
        public int PollQuestionId  {get;set;}
        public int PollSectionId  {get;set;}
        public string QuestionDescription  { get; set; } 
        public string AnswerType { get; set; }
        public int? Order {get;set;}

        public virtual ICollection<PollAnswer> PollAnswers {get;set;}
        public virtual PollSection PollSection {get;set;}
    }
}
