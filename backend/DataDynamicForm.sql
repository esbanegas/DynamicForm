USE [DbDynamicForm]
GO
SET IDENTITY_INSERT [dbo].[Forms] ON 

INSERT [dbo].[Forms] ([FormId], [Title]) VALUES (1, N'Software Developer')
INSERT [dbo].[Forms] ([FormId], [Title]) VALUES (6, N'General Questions')
SET IDENTITY_INSERT [dbo].[Forms] OFF
SET IDENTITY_INSERT [dbo].[FormSections] ON 

INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (1, 1, N'Section One')
INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (2, 1, N'SectionTwo')
INSERT [dbo].[FormSections] ([FormSectionId], [FormId], [SectionTitle]) VALUES (7, 6, N'Antivirus')
SET IDENTITY_INSERT [dbo].[FormSections] OFF
SET IDENTITY_INSERT [dbo].[FormQuestions] ON 

INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (1, 1, N'Is language developer?', N'checkbox', 1)
INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (2, 1, N'Is agile methodologies?', N'checkbox', 1)
INSERT [dbo].[FormQuestions] ([FormQuestionId], [FormSectionId], [QuestionDescription], [AnswerType], [Order]) VALUES (7, 7, N'What do you think is the best antivirus?', N'checkbox', 1)
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
SET IDENTITY_INSERT [dbo].[FormAnswers] OFF
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20201003160112_InitialCreate', N'3.1.8')
