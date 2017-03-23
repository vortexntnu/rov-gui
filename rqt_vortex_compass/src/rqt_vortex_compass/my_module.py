import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView

from nav_msgs.msg import Odometry


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

        self.sub = rospy.Subscriber("/state_estimate", Odometry, self.callback)

    def quaternion_to_euler(self, quaternion):
        quaternion = (pose.orientation.x, pose.orientation.y, pose.orientation.z, pose.orientation.w)
        euler = tf.transformations.euler_from_quaternion(quaternion)
        roll = euler[0]
        pitch = euler[1]
        yaw = euler[2]

    def callback(self, orientation):


        #self._widget.dial.setValue(depth.pose.pose.position.z)
        pass

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
