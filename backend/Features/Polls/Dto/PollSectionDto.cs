using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Polls.Dto
{
   public class PollSectionDto : ResponsaBase
   {
       public int SectionId { get; set; }
       public string SectionTitle { get; set; }

       public List<PollQuestionDto> Questions {get;set;}

        internal static List<PollSectionDto> From(ICollection<PollSection> pollSections)
        {
            return pollSections.Select(s=> new PollSectionDto{
                SectionId = s.PollSectionId,
                SectionTitle = s.SectionTitle,
                Questions = PollQuestionDto.From(s.PollQuestions)
            }).ToList();
        }
    } 
}