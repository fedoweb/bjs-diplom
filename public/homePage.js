'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.error) {
            console.error('Ошибка выхода из системы:', response.error);
        } else {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.error) {
        console.error('Ошибка получения данных:', response.error);
    } else {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getCurrencyRate() {
    ApiConnector.getStocks(response => {
        if (response.error) {
            console.error('Ошибка получения данных:', response.error);
        } else {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getCurrencyRate();
setInterval(getCurrencyRate, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(response, response.error);
            console.error('Ошибка пополнения баланса:', response.error);
        } else {
            moneyManager.setMessage(response, "Успешное пополнение!");
            ProfileWidget.showProfile(response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(response, response.error);
            console.error('Ошибка конвертации:', response.error);
        } else {
            moneyManager.setMessage(response, "Успешное конвертирование!");
            ProfileWidget.showProfile(response.data);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(response, response.error);
            console.error('Ошибка перевода:', response.error);
        } else {
            moneyManager.setMessage(response, "Успешный перевод!");
            ProfileWidget.showProfile(response.data);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.error) {
        moneyManager.setMessage(response, response.error);
        console.error('Ошибка получения списка избранного:', response.error);
    } else {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.error) {
            moneyManager.setMessage(response, response.error);
            console.error('Ошибка! Пользователь не добавлен в избранное:', response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.error) {
            moneyManager.setMessage(response, response.error);
            console.error('Ошибка! Пользователь не удален из избранного:', response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}
