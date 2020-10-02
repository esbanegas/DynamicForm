using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Forms
{
    public class FormQuestion : Entity
    {
        public int FormQuestionId  {get;set;}
        public int FormSectionId  {get;set;}
        public string QuestionDescription  { get; set; } 
        public string AnswerType { get; set; }

        public virtual ICollection<FormAnswer> FormAnswers {get;set;}
        public virtual FormSection FormSection {get;set;}
    }
}
