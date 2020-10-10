using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Features.Polls;
using backend.Features.Polls.Dto;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PollsController : ControllerBase
    {
        private readonly PollsAppService _pollsAppService;
        public PollsController(PollsAppService pollsAppService)
        {
           _pollsAppService= pollsAppService;
        }

        [HttpGet]
        public async Task<List<PollTemplateDto>> GetPolls([FromHeader] GetPollRequest request)
        {
            return await _pollsAppService.GetPolls(request);
        }

        [HttpPost]
        public  async Task<string> CreateForm(PostPollRequest request)
        {
            return await _pollsAppService.CretaePoll(request);
        }
    }
       
}