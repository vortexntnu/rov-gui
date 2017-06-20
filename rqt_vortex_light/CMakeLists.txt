cmake_minimum_required(VERSION 2.8.3)
project(rqt_vortex_light)

find_package(catkin REQUIRED COMPONENTS
  rospy
  rqt_gui_py
  vortex_msgs
  roslint
)


catkin_python_setup()

roslint_python()


catkin_package(
	CATKIN_DEPENDS rospy vortex_msgs
)

include_directories(
  ${catkin_INCLUDE_DIRS}
)

#add_executable(listener src/listener.py)
#target_link_libraries(listener ${catkin_LIBRARIES})
#add_dependencies( 


install(PROGRAMS
  scripts/rqt_vortex_light
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

