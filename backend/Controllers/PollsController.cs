using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Features.Polls;
using backend.Features.Polls.Dto;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Produces("application/json")]
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

         [HttpGet("pollsId-by-user")]
        public async Task<List<PollTemplateDto>> GetPolls([FromHeader] GetPollBUserRequest request)
        {
            return await _pollsAppService.GetPollsId(request);
        }

        [HttpPost]
        public  async Task<string> CreateForm([FromBody]PostPollRequest request)
        {
            return await _pollsAppService.CretaePoll(request);
            
        }
    }
       
}