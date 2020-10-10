using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Polls
{
public class Poll : Entity
{
    public int PollId { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public virtual ICollection<PollSection> PollSections {get;set;}
}
}