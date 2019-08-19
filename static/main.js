class Profile {
  constructor(user) {
    this.username = user.username;
    this.name = user.name;
    this.password = user.password;
  }


  createUser() {
    console.log(`Creating user ${this.username}`);
    return ApiConnector.createUser({
      username: this.username,
      name: this.name,
      password: this.password
    }, console.log);
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


  Ivan.createUser();
}

main();