using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Polls.Dto
{
   public class PollQuestionDto : ResponsaBase
   {
       public int PollQuestionId {get;set;}
       public string QuestionDescription { get; set; }
       public string AnswerType {get;set;}

       public int? Order {get;set;}

       public List<PollAnswerDto> Answers {get;set;}

        internal static List<PollQuestionDto> From(ICollection<PollQuestion> pollQuestions)
        {
            return pollQuestions.Select(q=> new PollQuestionDto{
                AnswerType = q.AnswerType,
                PollQuestionId = q.PollQuestionId,
                Order = q.Order,
                QuestionDescription = q.QuestionDescription,
                Answers = PollAnswerDto.From(q.PollAnswers)
            }).ToList();
        }
    } 
}