import $axios from "..";

const apiService = {
  register: (data) => $axios.post("/account/user-register/", data),
  login: (data) => $axios.post("/account/user-login/", data),
  generate: (data) => $axios.post("/account/user-generate-otp/", data),
  generateRegister: (data) =>
    $axios.post("/account/user-register-generate-otp/", data),
  otpRegister: (data) => $axios.post("/account/user-register-otp/", data),
  otpRegisterValidate: (data) => $axios.post("/account/user-login-otp/", data),
  otpLogin: (data) => $axios.post("/account/user-login-otp/", data),
  // Create Relation
  createRelation: (data) => $axios.post("/account/create-relation/", data),
  getMyContacts: () => $axios.get("/account/my-contacts/"),
  getMyDependants: () => $axios.get("/account/my-dependants/"),
};
export default apiService;
