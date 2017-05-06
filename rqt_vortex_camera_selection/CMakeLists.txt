cmake_minimum_required(VERSION 2.8.3)
project(rqt_vortex_camera_selection)

find_package(catkin REQUIRED COMPONENTS
  rospy
  rqt_gui_py
  vortex_msgs
)


catkin_python_setup()
#generate_messages()


catkin_package(
	CATKIN_DEPENDS rospy vortex_msgs 
)

include_directories(
  ${catkin_INCLUDE_DIRS}
)

install(PROGRAMS
  scripts/rqt_vortex_camera_selection
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

install(DIRECTORY
  resource
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)
install(FILES
  plugin.xml
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}
)

