function showStocks() {
  return ApiConnector.getStocks((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
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
        console.log(data);
        console.log(`Added ${amount} of ${currency} to ${this.name.firstName}`);
        callback();
      }
    });
  }

  convertMoney(fromCurrency, targetCurrency, targetAmont) {
    return ApiConnector.convertMoney({
      fromCurrency: fromCurrency,
      targetCurrency: targetCurrency,
      targetAmont: targetAmont
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
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

 Ivan.createUser(() => Ivan.authorize(() => Ivan.addMoney('EUR', 100000, () => Ivan.convertMoney('EUR', 'NETCOIN', 1))));
}

showStocks();
main();