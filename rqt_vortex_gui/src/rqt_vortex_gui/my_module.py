# -*- coding: latin-1 -*-

import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView
from python_qt_binding.QtGui import QColor

from std_msgs.msg import String
from nav_msgs.msg import Odometry
from vortex_msgs.msg import CameraFeedSelection, LightInput, ContainerID
from diagnostic_msgs.msg import DiagnosticStatus
from sensor_msgs.msg import Imu
from geometry_msgs.msg import Vector3Stamped

from thruster_interface.srv import *

ON = 100
OFF = 0


class MyPlugin(Plugin):

    def __init__(self, context):
        # PLUGIN CODE
        super(MyPlugin, self).__init__(context)

        # Give QObjects reasonable names
        self.setObjectName('MyPlugin')
        rp = rospkg.RosPack()

        # Process standalone plugin command-line arguments
        from argparse import ArgumentParser
        parser = ArgumentParser()
        # Add argument(s) to the parser.
        parser.add_argument("-q", "--quiet", action="store_true",
                            dest="quiet",
                            help="Put plugin in silent mode")
        args, unknowns = parser.parse_known_args(context.argv())
        if not args.quiet:
            print 'arguments: ', args
            print 'unknowns: ', unknowns

        # Create QWidget
        self._widget = QWidget()
        ui_file = os.path.join(rp.get_path('rqt_vortex_gui'), 'resource', 'MyPlugin.ui')

        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('MyPluginUi')

        # Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)

# -----------------------------------------------------------

        # Vortex logo
        self._widget.label_6.setStyleSheet("""QLabel {
            image: url(catkin_ws/src/rov-gui/rqt_vortex_gui/resource/logo_lang_sort.png);
            }""")

        # Control mode
        self._widget.lineControlMode.setReadOnly(True)
        self._widget.lineControlMode.setText("init")
        self.subControlMode = rospy.Subscriber("/controller/mode", String, self.callback_controlMode)

        # Depth
        self._widget.verticalSliderDepth.setEnabled(False)
        self._widget.verticalSliderDepth.setValue(0)
        self._widget.lineEditDepth.setReadOnly(True)
        self._widget.lineEditDepth.setText('init')
        self._widget.verticalSliderDepth.setRange(0, 60)  # Range 1-5 m
        self.subDepth = rospy.Subscriber("/state_estimate", Odometry, self.callback_depth)

        # Lights
        self._widget.btn_ramen.setCheckable(True)
        self._widget.btn_bluetooth.setCheckable(True)
        self._widget.btn_ramen.setStyleSheet("""QPushButton {
            background-color: orange;
            border-radius: 8px;
            color: black;
            }""")
        self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
            background-color: orange;
            border-radius: 8px;
            color: black;
            }""")
        self._widget.btn_ramen.toggled.connect(self.handle_ramen_clicked)
        self._widget.btn_bluetooth.toggled.connect(self.handle_bluetooth_clicked)
        self._widget.horizontalSlider_frontLight.sliderMoved.connect(self.handle_slider_moved)
        self.pubLights = rospy.Publisher('toggle_light', LightInput, queue_size=10)

        # Sensor calibration
        self._widget.lineAccelerometer.setReadOnly(True)
        self._widget.lineGyroscope.setReadOnly(True)
        self._widget.lineMagnetometer.setReadOnly(True)
        self.update_line_color(0, self._widget.lineAccelerometer)
        self.update_line_color(0, self._widget.lineGyroscope)
        self.update_line_color(0, self._widget.lineMagnetometer)
        self.subSensor = rospy.Subscriber("/sensors/imu/diagnostics", DiagnosticStatus, self.callback_sensor)

        # Thruster enable
        self._widget.btnKill.toggled.connect(self._handle_kill_clicked)
        self._widget.btnKill.setCheckable(True)
        self._widget.btnKill.setStyleSheet("""QPushButton {
            background-color: rgb(0,165,0);
            border-radius: 8px;
            color: black;
            }""")
        self.toggle_thruster = rospy.ServiceProxy('/thruster_interface/thrusters_enable', ThrustersEnable)

        self._widget.dial_1.setRange(-150, 150)
        # Compass
        self._widget.dial_1.show()
        self._widget.dial_1.setValue(0)
        self._widget.dial_1.setEnabled(False)
        self._widget.line_compass.setText('init')
        self.subCompass = rospy.Subscriber("/sensors/imu/euler", Vector3Stamped, self.callback_compass)

        # Camera Selection
        self._widget.comboBox_feed0.currentIndexChanged.connect(self.camera_selection0)
        self._widget.comboBox_feed1.currentIndexChanged.connect(self.camera_selection1)
        self._widget.comboBox_feed2.currentIndexChanged.connect(self.camera_selection2)
        self.pubCamera = rospy.Publisher('camera_feed_selection', CameraFeedSelection, queue_size=10)

        # Bluetooth
        self._widget.lineBluetoothMessage.setReadOnly(True)
        self._widget.lineBluetoothMessage.setText("init")
        self.subBluetooth = rospy.Subscriber('/bluetooth/container_id', ContainerID, self.callback_bluetooth)

    def callback_controlMode(self, mode):
        self._widget.lineControlMode.setText(mode.data)

    def callback_depth(self, depth):
        depth_update = depth.pose.pose.position.z
        bar_update = (depth_update*10)+10
        self._widget.verticalSliderDepth.setValue(bar_update)
        self._widget.lineEditDepth.setText(str("%.3f" % depth_update))

    def handle_ramen_clicked(self):
        try:
            if self._widget.btn_ramen.isChecked():
                self.pubLights.publish('raman', ON)

                self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: rgb(0,165,0);
                    border-radius: 8px;
                    color: black;
                    }""")
                print 'raman on'

            else:
                self.pubLights.publish('raman', OFF)
                self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: orange;
                    border-radius: 8px;
                    color: black;
                    }""")
                print 'raman off'

        except rospy.ServiceException, e:
            print "Publish call failed: %s" % e

            # Sets the button green ---- SHOULD IT THOUGH?????
            self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: orange;
                    border-radius: 8px;
                    color: black;
                    }""")

            # Unchecks to avoid trouble when restart
            self._widget.btn_ramen.setChecked(False)

    def handle_bluetooth_clicked(self):
        try:
            if self._widget.btn_bluetooth.isChecked():
                self.pubLights.publish('bluetooth', ON)

                self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: rgb(0,165,0);
                    border-radius: 8px;
                    color: black;
                    }""")
                print 'bluetooth on'

            else:
                self.pubLights.publish('bluetooth', OFF)
                self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: orange;
                    border-radius: 8px;
                    color: black;
                    }""")
                print 'bluetooth off'

        except rospy.ServiceException, e:
            print "Publish call failed: %s" % e

            # Sets the button green ---- SHOULD IT THOUGH?????
            self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: orange;
                    border-radius: 8px;
                    color: black;
                    }""")

            # Unchecks to avoid trouble when restart
            self._widget.btn_bluetooth.setChecked(False)

    def handle_slider_moved(self):
        try:
            intensity = self._widget.horizontalSlider_frontLight.value()
            if (intensity < 20):
                intensity = OFF

            self.pubLights.publish('front', intensity)
            print 'front: ' + str(intensity)

        except rospy.ServiceException, e:
            print "Publish call failed: %s" % e

    def callback_sensor(self, diagnostics):
        sys = diagnostics.values[0]
        gyro = diagnostics.values[1]
        accel = diagnostics.values[2]
        mag = diagnostics.values[3]

        self.update_line_color(int(accel.value), self._widget.lineAccelerometer)
        self.update_line_color(int(gyro.value), self._widget.lineGyroscope)
        self.update_line_color(int(mag.value), self._widget.lineMagnetometer)

    def update_line_color(self, status, line):
        if status == 0:
            line.setText(str(status))
            line.setStyleSheet("""QLineEdit {
            background-color: red;
            color: black;
            }""")

        elif status == 1:
            line.setText(str(status))
            line.setStyleSheet("""QLineEdit {
            background-color: orange;
            color: black;
            }""")

        elif status == 2:
            line.setText(str(status))
            line.setStyleSheet("""QLineEdit {
            background-color: yellow;
            color: black;
            }""")

        elif status == 3:
            line.setText(str(status))
            line.setStyleSheet("""QLineEdit {
            background-color: rgb(0,165,0);
            color: black;
            }""")

        else:
            line.setText('---')
            line.setStyleSheet("""QLineEdit {
            background-color: red;
            color: black;
            }""")

    def _handle_kill_clicked(self):
        try:
            if self._widget.btnKill.isChecked():
                self.toggle_thruster(False)

                self._widget.btnKill.setText('Thrusters disabled')
                self._widget.btnKill.setStyleSheet("""QPushButton {
                    background-color: red;
                    border-radius: 8px;
                    color: black;
                    }""")

            else:
                self.toggle_thruster(True)
                self._widget.btnKill.setText('Thrusters enabled')
                self._widget.btnKill.setStyleSheet("""QPushButton {
                    background-color: rgb(0,165,0);
                    border-radius: 8px;
                    color: black;
                    }""")

        except rospy.ServiceException, e:
            print "Service call failed: %s" % e

            # Sets the button green ---- SHOULD IT THOUGH?????
            self._widget.btnKill.setText('Thrusters enabled')
            self._widget.btnKill.setStyleSheet("""QPushButton {
                    background-color: rgb(0,165,0);
                    border-radius: 8px;
                    color: black;
                    }""")

            # Unchecks to avoid trouble when restart
            self._widget.btnKill.setChecked(False)

    def callback_compass(self, _orientation):
        orientation = int(_orientation.vector.x)
        self._widget.line_compass.setText(str(orientation) + '°')
        self._widget.dial_1.show()
        self._widget.dial_1.setValue(orientation)
        if -150 <= orientation <= 150:
            self._widget.line_compass.setStyleSheet("""QLineEdit {background-color:white; color: black}""")
        else:
            self._widget.line_compass.setStyleSheet("""QLineEdit {background-color:orange; color: black}""")

    def camera_selection0(self):
        # Get cam on feed0
        feed = 0
        feed0_cam = self._widget.comboBox_feed0.currentIndex()

        # Publish message
        self.pubCamera.publish(feed, feed0_cam)

    def camera_selection1(self):
        # Get cam on feed1
        feed = 1
        feed1_cam = self._widget.comboBox_feed1.currentIndex()

        # Publish message
        self.pubCamera.publish(feed, feed1_cam)

    def camera_selection2(self):
        # Get cam on feed2
        feed = 2
        feed2_cam = self._widget.comboBox_feed2.currentIndex()

        # Publish message
        self.pubCamera.publish(feed, feed2_cam)

    def callback_bluetooth(self, btMsg):
        self._widget.lineBluetoothMessage.setText(str(btMsg.container_id))

    def shutdown_plugin(self):
        self.subControlMode.unregister()
        self.subDepth.unregister()
        self.subSensor.unregister()
        self.subCompass.unregister()
        self.subBluetooth.unregister()
