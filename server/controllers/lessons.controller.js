const db = require('../models');

const Lesson = db.lesson;
const StudentsLessons = db.studentsLessons;

exports.getLessons = (req, res) => {
  Lesson.findAll({
    include: [
      {
        association: 'creator',
        as: 'creator',
        attributes: ['id', 'fullName'],
      },
      {
        association: 'students',
        as: 'students',
        attributes: ['id', 'fullName'],
      },
    ],
  })
    .then((lessons) => {
      res.status(200).send(lessons);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getTeacherLessons = (req, res) => {
  Lesson.findAll({
    where: {
      userId: req.query.teacherId,
    },
    include: [
      {
        association: 'creator',
        as: 'creator',
        attributes: ['id', 'fullName'],
      },
      {
        association: 'students',
        as: 'students',
        attributes: ['id', 'fullName'],
      },
    ],
  })
    .then((lessons) => {
      res.status(200).send(lessons);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getStudentLessons = (req, res) => {
  Lesson.findAll({
    include: [
      {
        association: 'creator',
        as: 'creator',
        attributes: ['id', 'fullName'],
      },
      {
        association: 'students',
        as: 'students',
        attributes: ['id', 'fullName'],
        where: {
          id: req.query.studentId,
        },
      },
    ],
  })
    .then((lessons) => {
      res.status(200).send(lessons);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createLesson = (req, res) => {
  Lesson.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    userId: req.body.userId,
  })
    .then((lesson) => {
      const studentsLessonsData = req.body.students.map((studentId) => ({
        lessonId: lesson.id,
        studentId: studentId,
      }));
      return StudentsLessons.bulkCreate(studentsLessonsData);
    })
    .then(() => {
      res.status(200).send();
    });
};
