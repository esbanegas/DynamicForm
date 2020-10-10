using backend.DataContext;
using backend.Features.Forms;
using backend.Features.Polls;
using Microsoft.Extensions.DependencyInjection;

namespace backend
{
     public static class ServicesDependency
    {
        public static void AddServiceDependency(this IServiceCollection services)
        {
            services.AddTransient(typeof(DynamicFormDataContext));

            services.AddTransient<FormsAppService>();
            services.AddTransient<PollsAppService>();
        }
    }
}