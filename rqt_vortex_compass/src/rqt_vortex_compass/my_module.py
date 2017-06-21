import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView

from geometry_msgs.msg import Vector3Stamped


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
        ui_file = os.path.join(rp.get_path('rqt_vortex_compass'), 'resource', 'MyPlugin.ui')
        
        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('MyPluginUi')

        #Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)


        self._widget.dial_1.setRange(30, 330)
        self._widget.dial_1.show()
        self._widget.dial_1.setValue(180)
        self._widget.dial_1.setEnabled(False)
        self._widget.line_compass.setText('init')
        self.subCompass = rospy.Subscriber("/sensors/imu/euler", Vector3Stamped, self.callback_compass)

    def callback_compass(self, _orientation):
        orientation = int(_orientation.orientation.z)
        self._widget.line_compass.setText(str(orientation))

        if (orientation >= 30) and (orientation <= 330):
            self._widget.dial_1.show()
            self._widget.dial_1.setValue(orientation)
            self._widget.line_compass.setStyleSheet("""QLineEdit {background-color:white; color: black}""")            
        elif (orientation < 30) and (orientation >= 0):
            self._widget.dial_1.setValue(30)
            self._widget.line_compass.setStyleSheet("""QLineEdit {background-color:red; color: black}""")
        elif (orientation > 330) and (orientation <= 360):
            self._widget.dial_1.setValue(330)
            self._widget.line_compass.setStyleSheet("""QLineEdit {background-color:red; color: black}""")


    def shutdown_plugin(self):
        self.subCompass.unregister()

    def save_settings(self, plugin_settings, instance_settings):
        # TODO save intrinsic configuration, usually using:
        # instance_settings.set_value(k, v)
        pass

    def restore_settings(self, plugin_settings, instance_settings):
        # TODO restore intrinsic configuration, usually using:
        # v = instance_settings.value(k)
        pass
