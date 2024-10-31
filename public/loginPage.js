'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
      if (response.error) {
        console.error('Ошибка! Вход не выполнен:', response.error);
        this.setLoginErrorMessage(response.error);
      } else {
        location.reload();
      }
  });
}


userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, response => {
    if (response.error) {
      console.error('Ошибка регистрации:', response.error);
      this.setRegisterErrorMessage(response.error);
    } else {
      location.reload();
    }
  });
}
