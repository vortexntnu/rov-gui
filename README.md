# ROV GUI
[![Build Status](https://travis-ci.org/vortexntnu/rov-gui.svg?branch=master)](https://travis-ci.org/vortexntnu/rov-gui)

This is the GUI for the International MATE ROV-competition 2018.
The GUI is made with React and Electron, and communicates with the ROV through ROS.

## Getting started
To start the GUI, run:
* `npm install`
* `npm run dev`

This will start the Electron-app in development mode.

## Production
Run `npm run dist`.
This will produce an Linux-x64 executable called __rov-gui__ inside dist/linux/rov-gui-linux-x64/

If another platform/arch is required this can be configured in package.json.


## ROS-documentation
In this section all the topics used by the GUI will be listed.

### All tabs
* __/is_alive__ _(std_msgs/Empty)_ - Should be published to by the ROV with a rate of at least 2 Hz. Otherwise the GUI will show an error message, indicating that the ROV is disconnected.

### General-tab
* __/general/healthcheck/\<item>__ _(std_msgs/Empty)_ - For telling if a specific component of the ROV is connected. Item is the name of the component (e.g. IMU, manipulator, etc) in lowercase. If it is not published to with a rate of at least 2 Hz the GUI will mark the component as "Not connected".