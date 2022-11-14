# Frontend

## Application (Development mode) Setup Guide

1. Install NodeJS (https://nodejs.org/en/)
    - used version 18.10.0 while creating the application

2. Clone git repository

3. `cd` into `project-app` folder on your terminal
    - (your device path)/(repository)/src/frontend/project-app/

4. Run `npm install --legacy-peer-deps` to install packages required for application

6. Run web application
```
npm start
```

6. (Optional) Run electron application
    - On a separate terminal, navigate to `project-app` folder and run:
```
npm run electron-dev
```

## Electron App Installation Package Build Guide

1. Ensure that application can run in development mode (see previous section)

2. Check/Modify output target format
    - Open `package.json` under `project-app` folder
    - Locate `"build"` and modify `"target"` field to expected output target format for respective platform
```
"build": {
    "appId": "com.electron.legwork",
    "productName": "LegWork App",
    "files": ["build/**/*", "node_modules/**/*"],
    "directories": {
      "buildResources": "public"
    },
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "deb"
    }
  }
```

3. `cd` into `project-app` folder on your terminal
    - (your device path)/(repository)/src/frontend/project-app/

4. Run `npm run electron:package:[target platform]` to build installation package
    - `[target platform]` available: `win`, `mac`, `linux`
    - **Note that current device must be of the same platform as target platform**

5. Location installation package under `project-app/dist/` folder
