# SuiRides App

A modern ride-sharing application built with Expo and React Native.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
  - [Development Mode](#development-mode)
  - [Web Build](#web-build)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

SuiRides is a ride-sharing application that connects drivers and passengers. This app is built using Expo and React Native, providing a cross-platform experience for iOS, Android, and web.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- For iOS development: macOS with Xcode
- For Android development: Android Studio with Android SDK

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MauriceOmbewa/SuiRides.git
   cd SuiRides
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App

### Development Mode

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the Expo development server and display a QR code in your terminal.

- **iOS**: Scan the QR code with your iPhone's camera app
- **Android**: Scan the QR code with the Expo Go app
- **Web**: Press 'w' in the terminal or navigate to the URL shown in the terminal

### Web Build

To build the app for web deployment:

```bash
npm run build:web
# or
yarn build:web
```

This will generate a production-ready web build in the `web-build` directory.

## Project Structure

```
suirides-app/
├── app/                # Main application code using Expo Router
├── assets/             # Static assets like images and fonts
├── components/         # Reusable UI components
├── .expo/              # Expo configuration files
├── node_modules/       # Dependencies
├── package.json        # Project configuration and dependencies
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build:web` - Build the app for web deployment
- `npm run lint` - Run linting checks

## Troubleshooting

### Common Issues

1. **Expo server not starting**
   - Ensure all dependencies are installed correctly
   - Try clearing the cache: `expo start -c`

2. **Build errors**
   - Check that you have the latest dependencies: `npm install`
   - Verify your Node.js version is compatible

3. **Device connection issues**
   - Ensure your device is on the same network as your development machine
   - Try using a tunnel connection: `expo start --tunnel`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
