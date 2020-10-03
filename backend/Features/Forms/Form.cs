using System.Collections.Generic;
using backend.DataContext.Data;

namespace backend.Features.Forms
{
public class Form : Entity
{
    public int FormId { get; set; }
    public string Title { get; set; }
    public virtual ICollection<FormSection> FormSections {get;set;}
}
}