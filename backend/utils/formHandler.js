async function saveFormData(db, table, data) {
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO ${table} (${keys}) VALUES (${placeholders})`, values, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
  }
  
  module.exports = { saveFormData };