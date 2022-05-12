const controller = require('../controllers/lessons.controller');
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  app.get('/api/lessons', controller.getLessons);
  app.get('/api/lessons/teachers', controller.getTeacherLessons);
  app.get('/api/lessons/students', controller.getStudentLessons);
  app.post('/api/lessons/create', controller.createLesson);
};
