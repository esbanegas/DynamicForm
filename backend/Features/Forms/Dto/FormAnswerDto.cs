using System;
using System.Collections.Generic;
using System.Linq;
using backend.Helpers;

namespace backend.Features.Forms.Dto
{
   public class FormAnswerDto : ResponsaBase
   {
       public int FormAnswerId {get;set;}
       public int FormQuestionId{get;set;}
       public string AnswerDescription {get;set;}
       public int? Order {get;set;}
       public string SelectedValue { get; set; }

        internal static List<FormAnswerDto> From(ICollection<FormAnswer> answers)
        {
            return answers.Select(a=> new FormAnswerDto{
                AnswerDescription = a.AnswerDescription,
                FormAnswerId = a.FormAnswerId,
                FormQuestionId = a.FormQuestionId,
                Order = a.Order,
            }).ToList();
        }
    } 
}