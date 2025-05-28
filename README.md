# SuiRides

A decentralized ride-sharing application built on the Sui blockchain.

## Project Overview

SuiRides is a modern ride-sharing platform that connects drivers and passengers using blockchain technology. The application leverages the Sui blockchain to provide secure, transparent, and efficient ride-sharing services.

## Table of Contents
- [SuiRides](#suirides)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
    - [Smart Contracts](#smart-contracts)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Running the Project](#running-the-project)
    - [Smart Contracts](#smart-contracts-1)
    - [Backend Server](#backend-server)
    - [Frontend Application](#frontend-application)
  - [Contributing](#contributing)
  - [License](#license)

## Architecture

SuiRides follows a full-stack architecture with three main components:

1. **Smart Contracts**: Written in Move language for the Sui blockchain
2. **Backend Server**: Node.js/Express API that interacts with the Sui blockchain
3. **Mobile/Web Frontend**: Cross-platform application built with Expo and React Native

## Technologies

### Smart Contracts
- Move programming language
- Sui blockchain framework

### Backend
- Node.js
- Express
- @mysten/sui.js SDK

### Frontend
- React Native
- Expo
- React Navigation
- Expo Router
- React Native Maps
- TypeScript

## Installation

### Prerequisites
- Node.js (v14 or newer)
- npm or Yarn
- Sui CLI (for smart contract development)
- Expo CLI

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MauriceOmbewa/SuiRides.git
   cd SuiRides
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up the smart contracts:
   ```bash
   cd ../contracts/suirides
   sui move build
   ```

## Running the Project

### Smart Contracts
To deploy the smart contracts to the Sui blockchain:
```bash
cd contracts/suirides
sui client publish --gas-budget 10000000
```

### Backend Server
To start the backend server:
```bash
cd backend
npm start
```

### Frontend Application
To run the frontend in development mode:
```bash
cd frontend
npm run dev
```

This will start the Expo development server and display a QR code in your terminal.

- **iOS**: Scan the QR code with your iPhone's camera app
- **Android**: Scan the QR code with the Expo Go app
- **Web**: Press 'w' in the terminal or navigate to the URL shown in the terminal

To build the app for web deployment:
```bash
npm run build:web
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.