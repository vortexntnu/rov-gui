import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView
from python_qt_binding.QtGui import QColor

from motor_interface.srv import *


class MyPlugin(Plugin):

    def __init__(self, context):
        #PLUGIN CODE
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
        ui_file = os.path.join(rp.get_path('rqt_vortex_thruster_enable'), 'resource', 'MyPlugin.ui')
        
        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('MyPluginUi')

        #Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)


        #MY CODE
        self._widget.btnKill.toggled.connect(self._handle_kill_clicked)
        self._widget.btnKill.setCheckable(True)

        self._widget.btnKill.setStyleSheet("""QPushButton {
            background-color: green; 
            border-radius: 8px;
            color: black;
            }""")

        self.toggle_thruster = rospy.ServiceProxy('thruster_disable', ThrusterToggle)

    #Toggle color when pushed
    def _handle_kill_clicked(self):
        if self._widget.btnKill.isChecked(): 
            self._widget.btnKill.setText('Thruster disabled')           
            self._widget.btnKill.setStyleSheet("""QPushButton {
                background-color: red; 
                border-radius: 8px;
                color: black;
                }""")
            self.toggle_thruster(True)

        else:
            self._widget.btnKill.setText('Thruster enabled')
            self._widget.btnKill.setStyleSheet("""QPushButton {
                background-color: green; 
                border-radius: 8px;
                color: black;
                }""")
            self.toggle_thruster(False)
       

    def shutdown_plugin(self):
        #self.s.unregister()
        pass

    def save_settings(self, plugin_settings, instance_settings):
        # TODO save intrinsic configuration, usually using:
        # instance_settings.set_value(k, v)
        pass

    def restore_settings(self, plugin_settings, instance_settings):
        # TODO restore intrinsic configuration, usually using:
        # v = instance_settings.value(k)
        pass