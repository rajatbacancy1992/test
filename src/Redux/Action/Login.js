//Sync action
export const syncLogin = (obj, type) => {

  localStorage.setItem("employeeId", obj.data && obj.data.employeeId);
  localStorage.setItem("id", obj.data && obj.data.id);
  localStorage.setItem("role", obj.data.role.roleId);
  return { type: "login", payload: obj };
};

export const syncLogout = obj => {
  
  localStorage.setItem("moduleId", "");
  localStorage.setItem("employeeId", "");
  localStorage.setItem("id", "");
  return { type: "logout", payload: {} };
};

//Async action
