# ROV GUI
This is the GUI for the International MATE ROV-competition 2018.
The GUI is made with React and Electron, and communicates with the ROV through ROS.

## Getting started
To start the GUI, run:
* `npm install`
* `npm run dev`

This will start the Electron-app in development mode.

## Production
Run `npm run dist`.
This will produce an Linux-x64 executable called RovGui inside dist/linux/RovGui-linux-x64/
If another platform/arch is required this can be configured in package.json.