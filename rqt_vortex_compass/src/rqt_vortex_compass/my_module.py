import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView

from sensor_msgs.msg import Imu


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

        self.sub = rospy.Subscriber("/sensors/imu/euler", Imu, self.callback)

    def callback(self, _orientation):
        try:
            orientation = int(_orientation)

            forward = 0
            right = 270
            left = 90
            backward = 180
            cake = 30
            limit_left = backward - cake
            limit_right = backward + cake
            value = 0
            slope = 50.0/150.0

            if (orientation > limit_left) and (orientation < limit_right):
                if orientation < backward:
                    value = 1
                else:
                    value = 99
            elif orientation < backward:
                value = 50 - slope*orientation
            elif orientation > backward:
                value = 100 - slope*(orientation-210.0)

            print value

            self._widget.dial.setValue(orientation.vector.z)
            self._widget.lineValue.setText(str(value))
        except Exception as e:
            raise

    def shutdown_plugin(self):
        self.sub.unregister()

    def save_settings(self, plugin_settings, instance_settings):
        # TODO save intrinsic configuration, usually using:
        # instance_settings.set_value(k, v)
        pass

    def restore_settings(self, plugin_settings, instance_settings):
        # TODO restore intrinsic configuration, usually using:
        # v = instance_settings.value(k)
        pass
