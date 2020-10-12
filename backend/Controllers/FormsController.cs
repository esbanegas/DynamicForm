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
            return await _formsAppService.GetForms(request);
        }

         [HttpGet("list-formsId")]
        public async Task<List<int>> GetFormsId()
        {
            return await _formsAppService.GetFormsId();
        }

        [HttpPost]
        public  async Task<string> CreateForm(PostFormRequest request)
        {
            return await _formsAppService.CretaeForm(request);
        }
    }
       
}