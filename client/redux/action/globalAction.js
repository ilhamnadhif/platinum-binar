export const setHasLogin = (payload) => {
  return { type: "SET_HASLOGIN", payload };
};

export const setUser = (formType, formValue) => {
  return { type: "SET_USER_AUTH", formType, formValue };
};
