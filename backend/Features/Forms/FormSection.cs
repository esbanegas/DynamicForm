using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Forms
{
    public class FormSection : Entity
    {
        public int FormSectionId  {get;set;}
        public string FormId { get; set; }
        public string SectionTitle { get; set; }

        public virtual ICollection<FormQuestion> FormQuestions{get;set;}
        public virtual Form Form {get;set;}
    }
}
