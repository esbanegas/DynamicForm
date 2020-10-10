using System.Collections.Generic;
using backend.Helpers;

namespace backend.Features.Polls.Dto
{
   public class PollTemplateDto : ResponsaBase
   {
       public int PollId { get; set; }
       public string Title { get; set; }

       public List<PollSectionDto> Sections {get;set;}
   } 
}