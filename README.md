# ROV GUI
[![Build Status](https://travis-ci.org/vortexntnu/rov-gui.svg?branch=master)](https://travis-ci.org/vortexntnu/rov-gui)

# This repository is archived due to it not being in use after moving over to creating AUVs :^) 

This is the GUI for the International MATE ROV-competition 2018.
The GUI is made with React and Electron, and communicates with the ROV through ROS.

## Getting started
To start the GUI, first install [npm](https://www.npmjs.com/get-npm), then run:
* `npm install`
* `npm run dev`

This will start the Electron-app in development mode.

### Connecting to ROS
To be able to connect to ROS, a ROS-bridge-server has to be installed:

Ubuntu: `sudo apt-get install ros-kinetic-rosbridge-suite`

## Production
Run `npm run dist`.
This will produce an Linux-x64 executable called __rov-gui__ inside dist/linux/rov-gui-linux-x64/

If another platform/arch is required this can be configured in package.json.


## ROS-documentation
In this section all the topics used by the GUI will be listed.

### All tabs
* __/is_alive__ _(std_msgs/Empty)_ - Should be published to by the ROV with a rate of at least 2 Hz. Otherwise the GUI will show an error message, indicating that the ROV is disconnected.

### General-tab
* __/general/healthcheck/\<item>__ _(std_msgs/Empty)_ - For telling if a specific component of the ROV is connected, where \<item> is the name of the component (e.g. IMU, manipulator, etc) in lowercase. If it is not published to with a rate of at least 2 Hz the GUI will mark the component as "Not connected".

### OBS-tab
* __/obs/voltage__ _(std_msgs/Float64)_ - The voltage of the OBS should be published to this topic.
* __/obs/angles__ _(geometry_msgs/Point)_ - The angle of the OBS should be published to this topic. The z-value of the Point-message is ignored.
* __/obs/data__ _(std_msgs/Float64MultiArray)_ - The data received from the OBS should be published to this topic. The GUI will then display the data both as a table and as a seismograph.

### Aircraft identification-tab
* __/aircraft_id/type__ _(std_msgs/String)_ - Publish a single letter A-F to indicate which kind of aircraft is identified by the ROV.
