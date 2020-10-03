using System.Collections.Generic;
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
        public List<FormTemplateDto> Get([FromHeader] GetFormRequest request)
        {
            return _formsAppService.GetFormsId(request);
        }
    }
       
}