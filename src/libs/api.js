//const BASE_URL = "http://localhost:3000"; //window.location.origin; 
const BASE_URL = window.location.origin; 
const IMAGE_HOST = `${BASE_URL}/uploads`;

const objectToFormData = function(object) {
  let formData = new FormData();
  for (let k in object) {
    formData.append(k, object[k]);
  }
  return formData;
};

const getCategories = function() {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/categories`, {
      method: "GET"
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getCategoryItems = function(file) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/categories/${file}`, {
      method: "GET"
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getCategorySchema = function(category) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/schemas/${category}`, {
      method: "GET"
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};


const createItem = function(category, data) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/create/${category}`, {
      method: "POST",
      body: objectToFormData(data)
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};

const editItem = function(category, index, data) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${category}/${index}`, {
      method: "PUT",
      body: objectToFormData(data)
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteItem = function(category, index) {
  const options = {
    method: "delete",
    headers: {
      "Content-Type": "text/plain"
    }
  };

  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${category}/${index}`, options)
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};

const uploadWebsite = function(data) {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/admin/website`, {
      method: "POST",
      body: data
    })
      .then(async res => {
        resolve(await res.json());
      })
      .catch(err => {
        reject(err);
      });
  });
};



module.exports = {
  IMAGE_HOST,
  getCategories,
  getCategoryItems,
  getCategorySchema,
  createItem,
  editItem,
  deleteItem,
  uploadWebsite
};
