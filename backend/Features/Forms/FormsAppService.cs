using System.Collections.Generic;
using System.Linq;
using backend.DataContext;

namespace backend.Features.Forms
{
    public class FormsAppService
    {
        private readonly DynamicFormDataContext _dynamicFormDataContext;
        public FormsAppService (DynamicFormDataContext dynamicFormDataContext)
        {
            _dynamicFormDataContext = dynamicFormDataContext;
        }
        public List<string> GetFormsId()
        {
            return _dynamicFormDataContext.Forms.Select(r=>r.FormId).Distinct().ToList();
        }
    }
}