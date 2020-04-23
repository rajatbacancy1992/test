//Sync action
export const syncLogin = (obj, type) => {
  console.log(obj)
  localStorage.setItem("token", obj.data && obj.data.token);
  return { type: "login", payload: obj.data };
};

export const syncLogout = obj => {
  
  localStorage.setItem("moduleId", "");
  localStorage.setItem("employeeId", "");
  localStorage.setItem("id", "");
  return { type: "logout", payload: {} };
};

//Async action
