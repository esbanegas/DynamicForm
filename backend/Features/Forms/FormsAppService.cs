using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataContext;
using backend.Features.Forms.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Forms
{
    public class FormsAppService
    {
        private readonly DynamicFormDataContext _dynamicFormDataContext;
        public FormsAppService(DynamicFormDataContext dynamicFormDataContext)
        {
            _dynamicFormDataContext = dynamicFormDataContext;
        }
        public async Task<List<FormTemplateDto>> GetForms(GetFormRequest request)
        {
            IEnumerable<Form> forms;
            if (request.FormId > 0)
            {
                forms = await _dynamicFormDataContext.Forms.Where(r => r.FormId == request.FormId).ToListAsync();
            }
            else
            {
                forms = await _dynamicFormDataContext.Forms.ToListAsync();
            }

            return BuildFormTemplateDto(forms);
        }

        public async Task<List<FormTemplateDto>> GetFormsId()
        {
            IEnumerable<Form> forms;
            
            forms = await _dynamicFormDataContext.Forms.ToListAsync();
        
            return forms.Select(s=> new FormTemplateDto{FormId= s.FormId, Title=s.Title, Description = s.Description }).ToList();
        }

        private List<FormTemplateDto> BuildFormTemplateDto(IEnumerable<Form> forms)
        {
            return forms.Select(f => new FormTemplateDto
            {
                FormId = f.FormId,
                Title = f.Title,
                Description = f.Description,
                Sections = FormSectionDto.From(f.FormSections)

            }).ToList();
        }

        public async Task<string> CretaeForm(PostFormRequest request)
        {
            if (request == null) throw new Exception(nameof(request));
            if (request.Form == null) throw new Exception(nameof(request.Form));

            string validationMessage;
            if (ValidNewFormData(request.Form, out validationMessage))
            {
                var newForm = BuildNewForm(request.Form);
                _dynamicFormDataContext.Forms.Add(newForm);

                await _dynamicFormDataContext.SaveChangesAsync();
            }

            return validationMessage;

        }

        private Form BuildNewForm(FormTemplateDto formDto)
        {
            Form newForm = new Form
            {
                Title = formDto.Title,
                Description = formDto.Description,
                FormSections = BuildFormSection(formDto.Sections)
            };

            return newForm;
        }

        private List<FormSection> BuildFormSection(List<FormSectionDto> sectionsDto)
        {
            return sectionsDto.Select(s => new FormSection
            {
                SectionTitle = s.SectionTitle,
                FormQuestions = BuildQuestions(s.Questions)
            }).ToList();
        }

        private List<FormQuestion> BuildQuestions(List<FormQuestionDto> questionsDto)
        {
            return questionsDto.Select(s => new FormQuestion
            {
                Order = s.Order,
                QuestionDescription = s.QuestionDescription,
                AnswerType = s.AnswerType,
                FormAnswers = BuildAnswer(s.Answers)
            }).ToList();
        }

        private List<FormAnswer> BuildAnswer(List<FormAnswerDto> answersDto)
        {
            return answersDto.Select(a => new FormAnswer
            {
                Order = a.Order,
                AnswerDescription = a.AnswerDescription,

            }).ToList();
        }

        private bool ValidNewFormData(FormTemplateDto form, out string validationMessage)
        {
            validationMessage = string.Empty;
            if (string.IsNullOrWhiteSpace(form.Title))
            {
                validationMessage = "Please define a Title for the Form";
                return false;
            }
            if (form.Sections == null || form.Sections.Count() == 0)
            {
                validationMessage = "Please define Section for the Form";
                return false;
            }
            var questions = form.Sections.SelectMany(s => s.Questions);

            if (questions == null || questions.Count() == 0)
            {
                validationMessage = "Please define some questions for the Form";
                return false;
            }
            foreach (var question in questions)
            {
                if (string.IsNullOrWhiteSpace(question.AnswerType))
                {
                    validationMessage = $"Please difine AnswerType for questión";
                    return false;
                }

                if (string.IsNullOrWhiteSpace(question.QuestionDescription))
                {
                    validationMessage = $"Please difine a description for questión";
                    return false;
                }

                var answers = question.Answers;
                if (answers == null || answers.Count() == 0)
                {
                    validationMessage = $"Please define answear for questions {question.QuestionDescription}";
                    return false;
                }
            }
            return true;
        }
    }
}