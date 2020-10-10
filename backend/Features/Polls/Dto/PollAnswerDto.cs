using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Polls.Dto
{
   public class PollAnswerDto : ResponsaBase
   {
       public int PollAnswerId  {get;set;}
        public int PollQuestionId  {get;set;}
        public string AnswerDescription  { get; set; } 
        public int? Order { get; set; }

        internal static List<PollAnswerDto> From(ICollection<PollAnswer> answers)
        {
            return answers.Select(a=> new PollAnswerDto{
                AnswerDescription = a.AnswerDescription,
                PollAnswerId = a.PollAnswerId,
                PollQuestionId = a.PollQuestionId,
                Order = a.Order,
            }).ToList();
        }
    } 
}