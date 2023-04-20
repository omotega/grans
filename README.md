# grans


## About Grans
This is a wallet api where users can perform basic banking operations like transferring funds,depositing funds and more.

### Features

1.USERS

a. User Signup 
* Route api/user/signup
* Method POST

b. User Login
* Route api/user/login
* Method GET

c. User Verification
* Route api/user/login
* Method GET

d. User Profile Update
* Route api/user/updateprofile
* Method PATCH

2.CARD TRANSACTIONS (Funding your wallet with card)

a. Card Transactions Without Validation
* Route api/cardtransaction/fundwallet
* Method POST

b. Card transaction with Pin
* Route api/cardtransaction/submitpin
* Method POST

c. Card transaction with Pin and otp
* Route api/cardtransaction/submitotp
* Method POST

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Technologies Used

* Node.js - Javascript runtime environment
* Express - Web framework for Node.js
* Sequelize - A promised-based Node.js orm tool
* PostgreSQL - Object-relational database

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/omotega/grans.git 
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Make a copy of the .env.example file to .env 

<p align="right">(<a href="#readme-top">back to top</a>)</p>
