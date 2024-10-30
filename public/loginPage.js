'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {

      if (response.error) {
        this.setLoginErrorMessage(response.error);
      } else {
        //console.log('Ответ сервера:', response);
        location.reload();
      }
       
  })
};


userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, response => {

    if (response.error) {
      this.setRegisterErrorMessage(response.error);
    } else {
      //console.log('Ответ сервера:', response);
      location.reload();
    }
     
  })
};
