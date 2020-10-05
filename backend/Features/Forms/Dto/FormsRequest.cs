namespace backend.Features.Forms.Dto
{
    public class GetFormRequest
    {
        public int? FormId {get; set;}
    }

     public class PostFormRequest
    {
        public FormTemplateDto Form{get;set;}
    }
} 