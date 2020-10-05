using backend.DataContext.Data;

namespace backend.Features.Forms
{
    public class FormAnswer : Entity
    {
        public int FormAnswerId  {get;set;}
        public int FormQuestionId  {get;set;}
        public string AnswerDescription  { get; set; } 
        public int? Order { get; set; }

        public virtual FormQuestion FormQuestion {get;set;}
    }
}
