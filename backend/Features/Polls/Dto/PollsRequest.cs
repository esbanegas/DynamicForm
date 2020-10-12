using backend.Features.Forms.Dto;

namespace backend.Features.Polls.Dto
{
    public class GetPollRequest
    {
        public int? PollId {get; set;}
    }

     public class GetPollBUserRequest
    {
        public string UserId {get; set;}
    }

     public class PostPollRequest
    {
        public FormTemplateDto Form{get;set;}
    }
} 