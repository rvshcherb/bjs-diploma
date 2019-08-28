function getStocks(wallet, callback) {
  console.log(wallet);
  let fromCurrency;
  let targetAmount;
  for (let cur in wallet) {
    if (wallet[cur] > 0) {
      fromCurrency = cur;
      currencyAmount = wallet[cur];
    }
  }
  return ApiConnector.getStocks((err, data) => {
    if (err) {
      console.log(err);
    } else {
      // вот сюда можно вставить алгоритм расчета оптимального курса
      callback(fromCurrency, 'NETCOIN', data[99][`${fromCurrency}_NETCOIN`] * currencyAmount);
    }
  });
}

class Profile {
  constructor(user) {
    this.username = user.username;
    this.name = user.name;
    this.password = user.password;
  }


  createUser(callback) {
    console.log(`Creating user ${this.username}`);
    return ApiConnector.createUser({
      username: this.username,
      name: this.name,
      password: this.password
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${this.name.firstName} is created`);
        //console.log(data);
        callback();
      }
    });
  }

  authorize(callback) {
    console.log(`Authorizing user ${this.username}`);
    return ApiConnector.performLogin({
      username: this.username,
      password: this.password,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${this.name.firstName} is authorized`);
        callback();
      }
    });
  }

  addMoney(currency, amount, callback) {
    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
    return ApiConnector.addMoney({
      currency: currency,
      amount: amount,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(data);
        console.log(`Added ${amount} of ${currency} to ${this.name.firstName}`);
        callback(data.wallet);
      }
    });
  }

  convertMoney(fromCurrency, targetCurrency, targetAmount, callback) {
    console.log(`Converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
    return ApiConnector.convertMoney({
      fromCurrency: fromCurrency,
      targetCurrency: targetCurrency,
      targetAmount: targetAmount
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        callback();
      }
    });
  }

  transferMoney(to, amount) {
    console.log(`Transfering ${amount} NETCOINS to ${to}`);
    return ApiConnector.transferMoney({
      to: to,
      amount: amount,
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${to} has got ${amount}  NETCOINS`);
        console.log(data);
      }
    });
  }
}


function main() {
  const Ivan = new Profile({
    username: 'ivan',
    name: {
      firstName: 'Ivan',
      lastName: 'Chernyshev'
    },
    password: 'ivanspass',
  });

  const Petr = new Profile({
    username: 'petya',
    name: {
      firstName: 'Petr',
      lastName: 'Petrov'
    },
    password: 'petrpass',
  });


  Ivan.createUser(() => Ivan.authorize(() => Ivan.addMoney('USD', 100000, (data) => getStocks(data, (fromCurrency, targetCurrency, targetAmount) => Ivan.convertMoney(fromCurrency, 'NETCOIN', targetAmount, () => Petr.createUser(() => Ivan.transferMoney('petya', targetAmount)))))));
}

main();