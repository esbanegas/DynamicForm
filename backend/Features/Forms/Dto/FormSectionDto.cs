using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Forms.Dto
{
   public class FormSectionDto : ResponsaBase
   {
       public int SectionId { get; set; }
       public string SectionTitle { get; set; }

       public List<FormQuestionDto> Questions {get;set;}

        internal static List<FormSectionDto> From(ICollection<FormSection> formSections)
        {
            return formSections.Select(s=> new FormSectionDto{
                SectionId = s.FormSectionId,
                SectionTitle = s.SectionTitle,
                Questions = FormQuestionDto.From(s.FormQuestions)
            }).ToList();
        }
    } 
}