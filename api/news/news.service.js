const pool = require("../../config/database");
module.exports = {
  createNews: (data, callBack) => {
    pool.query(
      `insert into blog_tb(title, user_id, description,image,name) 
                values(?,?,?,?,?)`,
      [
        data.title,
        data.user_id,
        data.description,
        data.image,
        data.name
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getNews: (callBack) => {
    pool.query(`select * from blog_tb`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
   getNewsByUserId: (id, callBack) => {
    pool.query(
      `select * from blog_tb where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
   getNewsById: (id, callBack) => {
    pool.query(
      `select * from blog_tb where blog_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateNews: (data, callBack) => {
    pool.query(
      `update blog_tb set title=?, description
      =?, image=? where blog_id = ?`,
      [
        data.title,
        
        data.description,
        data.image,
        data.blog_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteNews: (data, callBack) => {
    pool.query(
      `delete from blog_tb where blog_id = ?`,
      [data.blog_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
