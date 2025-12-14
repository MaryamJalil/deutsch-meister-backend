// Helper functions for lazy type resolution to avoid circular dependencies in ES modules

export function getLevelModel() {
  return require('./level.model.js').LevelModel;
}

export function getQuizModel() {
  return require('./quiz.model.js').QuizModel;
}

export function getQuestionModel() {
  return require('./question.model.js').QuestionModel;
}

export function getCourseModel() {
  return require('./course.model.js').CourseModel;
}

export function getLessonModel() {
  return require('./lesson.model.js').LessonModel;
}
