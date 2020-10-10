using System.Collections.Generic;
using backend.Helpers;

namespace backend.Features.Forms.Dto
{
   public class FormTemplateDto : ResponsaBase
   {
       public int FormId { get; set; }
       public string Title { get; set; }
       public string Description { get; set; }

       public List<FormSectionDto> Sections {get;set;}
   } 
}