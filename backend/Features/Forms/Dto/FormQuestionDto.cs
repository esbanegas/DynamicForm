using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Forms.Dto
{
   public class FormQuestionDto : ResponsaBase
   {
       public int FormQuestionId {get;set;}
       public string QuestionDescription { get; set; }
       public string AnswerType {get;set;}

       public int? Order {get;set;}

       public List<FormAnswerDto> Answers {get;set;}

        internal static List<FormQuestionDto> From(ICollection<FormQuestion> formQuestions)
        {
            return formQuestions.Select(q=> new FormQuestionDto{
                AnswerType = q.AnswerType,
                FormQuestionId = q.FormQuestionId,
                Order = q.Order,
                QuestionDescription = q.QuestionDescription,
                Answers = FormAnswerDto.From(q.FormAnswers)
            }).ToList();
        }
    } 
}