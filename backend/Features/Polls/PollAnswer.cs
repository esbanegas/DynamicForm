using backend.DataContext.Data;

namespace backend.Features.Polls
{
    public class PollAnswer : Entity
    {
        public int PollAnswerId  {get;set;}
        public int PollQuestionId  {get;set;}
        public string AnswerDescription  { get; set; } 
        public int? Order { get; set; }

        public virtual PollQuestion PollQuestion {get;set;}
    }
}
