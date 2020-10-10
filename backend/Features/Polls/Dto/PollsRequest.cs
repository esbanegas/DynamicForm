namespace backend.Features.Polls.Dto
{
    public class GetPollRequest
    {
        public int? PollId {get; set;}
    }

     public class PostPollRequest
    {
        public PollTemplateDto Poll{get;set;}
    }
} 