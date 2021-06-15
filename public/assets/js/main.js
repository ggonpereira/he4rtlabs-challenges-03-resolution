// Declaring variables
const formRegister = document.querySelector(".form-register");
const formLogin = document.querySelector(".form-login");
const wrapper = document.querySelector(".wrapper");

(() => {
  wrapper.classList.add("login");
})();

function changeForm() {
  if (formRegister.classList.contains("hide")) {
    formRegister.classList.remove("hide");
    formLogin.classList.add("hide");
    wrapper.classList.remove("login");
    wrapper.classList.add("register");
  } else if (formLogin.classList.contains("hide")) {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
    wrapper.classList.remove("register");
    wrapper.classList.add("login");
  }
}
