using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Features.Forms;
using backend.Features.Forms.Dto;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly FormsAppService _formsAppService;
        public FormsController(FormsAppService formsAppService)
        {
           _formsAppService= formsAppService;
        }

        [HttpGet]
        public async Task<List<FormTemplateDto>> GetForms([FromHeader] GetFormRequest request)
        {
            return await _formsAppService.GetFormsId(request);
        }

        [HttpPost]
        public  async Task<string> CreateForm(PostFormRequest request)
        {
            return await _formsAppService.CretaeForm(request);
        }
    }
       
}