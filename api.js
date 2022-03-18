import fs from 'fs';

const db = './db.json';

export const services = {
  get: function (resolve, reject) {
    fs.readFile(db, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  },
  getByID: function (id, resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let getId = JSON.parse(data).find((p) => +p.id === +id);
        resolve(getId);
      }
    });
  },
  createServices: function (newData, resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      }

      let result = JSON.parse(data);

      result.push(newData);

      fs.writeFile(db, JSON.stringify(result), function (err) {
        if (err) {
          reject(err);
        }
        resolve(newData);
      });
    });
  },

  updateServices: function (updateData, id, resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      }

      let res = JSON.parse(data);
      let resbyId = res.find((rec) => +rec.id === +id);

      if (resbyId) {
        Object.assign(resbyId, updateData);
        fs.writeFile(db, JSON.stringify(res), function (err) {
          resolve(updateData);
        });
      }
    });
  },
  deleteEachServices: function (id, resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      }

      let result = JSON.parse(data);
      let resId = result.findIndex((rec) => +rec.id === +id);

      if (resId !== -1) {
        result.splice(resId, 1);

        fs.writeFile(db, JSON.stringify(result), function () {
          resolve(resId);
        });
      }
    });
  },
  deleteAllServices: function (resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      }

      let result = JSON.parse(data);
      let resId = result.filter((rec) => rec);

      if (resId !== -1) {
        result.splice(resId);

        fs.writeFile(db, JSON.stringify(result), function () {
          resolve(resId);
        });
      }
    });
  },
  filterServicesByQuery: function (searchQuery, resolve, reject) {
    fs.readFile(db, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let res = JSON.parse(data);
        // Perform search
        if (searchQuery) {
          res = res.filter(
            (p) =>
              (searchQuery.id ? +p.id === +searchQuery.id : true) &&
              (searchQuery.name
                ? p.name.toLowerCase().indexOf(searchQuery.name) >= 0
                : true)
          );
        }

        resolve(res);
      }
    });
  },
};

const binarySearch = (arr, val) => {
  let lower = 0;
  let upper = arr.length - 1;

  while (lower <= upper) {
    let mid = lower + Math.floor((upper - lower) / 2);

    if (arr[mid] === val) {
      return arr[mid];
    }
    if (val < arr[mid]) {
      upper = mid - 1;
    } else {
      lower = mid + 1;
    }
  }
  return -1;
};
