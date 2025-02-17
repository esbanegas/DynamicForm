USE [DbDynamicForm]
GO
SET IDENTITY_INSERT [dbo].[Forms] ON 

INSERT [dbo].[Forms] ([FormId], [Title], [Description]) VALUES (1, N'Software Developer', N'Form for developers')
INSERT [dbo].[Forms] ([FormId], [Title], [Description]) VALUES (6, N'General Questions', N'Form for any user')
SET IDENTITY_INSERT [dbo].[Forms] OFF
SET IDENTITY_INSERT [dbo].[FormSections] ON 

INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (1, 1, N'Section One')
INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (2, 1, N'SectionTwo')
INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (7, 6, N'Antivirus')
SET IDENTITY_INSERT [dbo].[FormSections] OFF
SET IDENTITY_INSERT [dbo].[FormQuestions] ON 

INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (1, 1, N'Is language developer?', N'checkBox', 1)
INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (2, 1, N'Is agile methodologies?', N'radioButton', 1)
INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (7, 7, N'What do you think is the best antivirus?', N'checkBox', 1)
INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (8, 1, N'Some Comment ?', N'textField', 1)
SET IDENTITY_INSERT [dbo].[FormQuestions] OFF
SET IDENTITY_INSERT [dbo].[FormAnswers] ON 

INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (1, 1, N'C#', 1)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (2, 1, N'React', 2)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (3, 1, N'Javascript', 3)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (4, 1, N'Scrum', 4)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (5, 2, N'Scrum', 1)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (6, 2, N'Waterfall ', 2)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (7, 2, N'Kanban', 3)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (12, 7, N'McAfee ', 0)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (13, 7, N'Eset ', 0)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (14, 8, N'Enter first comment', 1)
INSERT [dbo].[FormAnswers] ([FormAnswerId], [FormQuestionId], [AnswerDescription], [Order]) VALUES (15, 8, N'Enter second comment', 2)
SET IDENTITY_INSERT [dbo].[FormAnswers] OFF
SET IDENTITY_INSERT [dbo].[Polls] ON 

INSERT [dbo].[Polls] ([PollId], [Title], [Description], [UserId]) VALUES (1, N'Software Developer', N'Poll Descriptions', N'ttyler')
SET IDENTITY_INSERT [dbo].[Polls] OFF
SET IDENTITY_INSERT [dbo].[PollSections] ON 

INSERT [dbo].[PollSections] ([PollSectionId], [PollId], [SectionTitle]) VALUES (1, 1, N'Antivirus')
SET IDENTITY_INSERT [dbo].[PollSections] OFF
SET IDENTITY_INSERT [dbo].[PollQuestions] ON 

INSERT [dbo].[PollQuestions] ([PollQuestionId], [PollSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (1, 1, N'What do you think is the best antivirus?', N'checkBox', 1)
INSERT [dbo].[PollQuestions] ([PollQuestionId], [PollSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (2, 1, N'Some comment', N'textField', 2)
SET IDENTITY_INSERT [dbo].[PollQuestions] OFF
SET IDENTITY_INSERT [dbo].[PollAnswers] ON 

INSERT [dbo].[PollAnswers] ([PollAnswerId], [PollQuestionId], [AnswerDescription], [Order], [SelectedValue]) VALUES (1, 1, N'McAfee ', 1, N'false')
INSERT [dbo].[PollAnswers] ([PollAnswerId], [PollQuestionId], [AnswerDescription], [Order], [SelectedValue]) VALUES (2, 1, N'Nod32', 2, N'true')
INSERT [dbo].[PollAnswers] ([PollAnswerId], [PollQuestionId], [AnswerDescription], [Order], [SelectedValue]) VALUES (3, 2, N'Type Text', 1, N'The user type some text here')
SET IDENTITY_INSERT [dbo].[PollAnswers] OFF
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201003160112_InitialCreate', N'3.1.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201005052759_AddColumnDescription', N'3.1.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201009235529_CreateTableToPolls', N'3.1.8')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201010003214_AddColumnUserAndValueForPolls', N'3.1.8')
