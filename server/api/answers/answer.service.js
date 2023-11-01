const pool = require("../../config/Database");

module.exports = {
  addAnswer: (data, callback) => {
    pool.query(
      `INSERT INTO answer(answer, question_id, user_id)VALUES(?, ?, ?)`,
      [data.answer, data.questionId, data.userId],
      (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      }
    );
  },

  getAnswers: (questionId, callback) => {
    pool.query(
      // `SELECT answer, user_name FROM answer JOIN registration ON answer.user_id = registration.user_id AND answer.question_id = ? ORDER BY answer_id DESC`,
      `SELECT answer_id, answer, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
      [questionId],
      (err, results) => {
        if (err) return callback(err);
        return callback(null, results);
      }
    );
  },
};

// `SELECT * FROM answer WHERE question_id = ?`,
// `SELECT answer_id, answer, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ${questionId}`,
// [questionId],
