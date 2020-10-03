using System;
using System.Collections.Generic;
using System.Linq;
using backend.DataContext;
using backend.Features.Forms.Dto;

namespace backend.Features.Forms
{
    public class FormsAppService
    {
        private readonly DynamicFormDataContext _dynamicFormDataContext;
        public FormsAppService (DynamicFormDataContext dynamicFormDataContext)
        {
            _dynamicFormDataContext = dynamicFormDataContext;
        }
        public List<FormTemplateDto> GetFormsId(GetFormRequest request)
        {
            IEnumerable<Form> forms;
            if(request.FormId>0){
             forms = _dynamicFormDataContext.Forms.Where(r=>r.FormId==request.FormId).ToList();
            }
            else{
                forms = _dynamicFormDataContext.Forms.ToList();
            }

            return BuildFormTemplateDto(forms);
        }

        private List<FormTemplateDto> BuildFormTemplateDto(IEnumerable<Form> forms)
        {
            return forms.Select(f=> new FormTemplateDto{
                     FormId = f.FormId,
                     Title = f.Title,
                     Sections = FormSectionDto.From(f.FormSections)

            }).ToList();
        }
    }
}