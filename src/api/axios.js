import $axios from "..";

const apiService = {
  register: (data) => $axios.post("/account/user-register/", data),
  login: (data) => $axios.post("/account/user-register/", data),
  generate: (data) => $axios.post("/account/user-generate-otp/", data),
  otpRegister: (data) => $axios.post("/account/user-register-otp/", data),
  otpLogin: (data) => $axios.post("/account/user-login-otp/", data),
};
export default apiService;
