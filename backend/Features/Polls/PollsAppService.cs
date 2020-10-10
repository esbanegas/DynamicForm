using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataContext;
using backend.Features.Polls.Dto;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Polls
{
    public class PollsAppService
    {
        private readonly DynamicFormDataContext _dynamicFormDataContext;
        public PollsAppService(DynamicFormDataContext dynamicFormDataContext)
        {
            _dynamicFormDataContext = dynamicFormDataContext;
        }
        public async Task<List<PollTemplateDto>> GetPolls(GetPollRequest request)
        {
            IEnumerable<Poll> polls;
            if (request.PollId > 0)
            {
                polls = await _dynamicFormDataContext.Polls.Where(r => r.PollId == request.PollId).ToListAsync();
            }
            else
            {
                polls = await _dynamicFormDataContext.Polls.ToListAsync();
            }

            return BuildPollTemplateDto(polls);
        }

        private List<PollTemplateDto> BuildPollTemplateDto(IEnumerable<Poll> polls)
        {
            return polls.Select(f => new PollTemplateDto
            {
                PollId = f.PollId,
                Title = f.Title,
                Sections = PollSectionDto.From(f.PollSections)

            }).ToList();
        }

        public async Task<string> CretaePoll(PostPollRequest request)
        {
            if (request == null) throw new Exception(nameof(request));
            if (request.Poll == null) throw new Exception(nameof(request.Poll));

            string validationMessage;
            if (ValidNewPollData(request.Poll, out validationMessage))
            {
                var newPoll = BuildNewPoll(request.Poll);
                _dynamicFormDataContext.Polls.Add(newPoll);

                await _dynamicFormDataContext.SaveChangesAsync();
            }

            return validationMessage;

        }

        private Poll BuildNewPoll(PollTemplateDto pollDto)
        {
            Poll newPoll = new Poll
            {
                Title = pollDto.Title,
                PollSections = BuildPollSection(pollDto.Sections)
            };

            return newPoll;
        }

        private List<PollSection> BuildPollSection(List<PollSectionDto> sectionsDto)
        {
            return sectionsDto.Select(s => new PollSection
            {
                SectionTitle = s.SectionTitle,
                PollQuestions = BuildQuestions(s.Questions)
            }).ToList();
        }

        private List<PollQuestion> BuildQuestions(List<PollQuestionDto> questionsDto)
        {
            return questionsDto.Select(s => new PollQuestion
            {
                Order = s.Order,
                QuestionDescription = s.QuestionDescription,
                AnswerType = s.AnswerType,
                PollAnswers = BuildAnswer(s.Answers)
            }).ToList();
        }

        private List<PollAnswer> BuildAnswer(List<PollAnswerDto> answersDto)
        {
            return answersDto.Select(a => new PollAnswer
            {
                Order = a.Order,
                AnswerDescription = a.AnswerDescription,

            }).ToList();
        }

        private bool ValidNewPollData(PollTemplateDto poll, out string validationMessage)
        {
            validationMessage = string.Empty;
            if (string.IsNullOrWhiteSpace(poll.Title))
            {
                validationMessage = "Please define a Title for the Poll";
                return false;
            }
            if (poll.Sections == null || poll.Sections.Count() == 0)
            {
                validationMessage = "Please define Section for the Poll";
                return false;
            }
            var questions = poll.Sections.SelectMany(s => s.Questions);

            if (questions == null || questions.Count() == 0)
            {
                validationMessage = "Please define some questions for the Poll";
                return false;
            }
            foreach (var question in questions)
            {
                if (string.IsNullOrWhiteSpace(question.AnswerType))
                {
                    validationMessage = $"Please difine AnswerType for questión";
                    return false;
                }

                if (string.IsNullOrWhiteSpace(question.QuestionDescription))
                {
                    validationMessage = $"Please difine a description for questión";
                    return false;
                }

                var answers = question.Answers;
                if (answers == null || answers.Count() == 0)
                {
                    validationMessage = $"Please define answear for questions {question.QuestionDescription}";
                    return false;
                }
            }
            return true;
        }
    }
}