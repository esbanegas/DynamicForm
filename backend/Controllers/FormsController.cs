using System.Collections.Generic;
using backend.Features.Forms;
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
        public List<string> Get()
        {
            return _formsAppService.GetFormsId();
        }
    }
       
}