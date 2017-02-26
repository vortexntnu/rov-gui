cmake_minimum_required(VERSION 2.8.3)
project(rqt_vortex_thruster_enable)

find_package(catkin REQUIRED COMPONENTS
  rospy
  rqt_gui_py
  std_msgs
  message_generation
)


catkin_python_setup()

#add_service_files(ThrusterEnable)
#generate_messages()


  # Declare the service files to be built
#add_service_files(FILES
#    MyService.srv
#  )

  # Actually generate the language-specific message and service files
#generate_messages(DEPENDENCIES std_msgs)



catkin_package(
	CATKIN_DEPENDS rospy std_msgs message_runtime
)


include_directories(
  ${catkin_INCLUDE_DIRS}
)

install(PROGRAMS
  scripts/rqt_vortex_thruster_enable
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

