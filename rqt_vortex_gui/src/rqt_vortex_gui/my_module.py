import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView
from python_qt_binding.QtGui import QColor

from std_msgs.msg import String


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
        ui_file = os.path.join(rp.get_path('rqt_vortex_gui'), 'resource', 'MyPlugin.ui')
        
        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('MyPluginUi')

        #Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)

        self._widget.btnKill.setStyleSheet("""QPushButton {
            background-color: rgb(0,165,0); 
            border-radius: 8px;
            color: black;
            }""")

        self._widget.label_6.setStyleSheet("""QLabel {
            image: url(Documents/Vortex/logo_lang_sort.png);
            }""")

        self._widget.dial.setValue(50)

    def shutdown_plugin(self):
        #self.sub.unregister()
        pass

    def save_settings(self, plugin_settings, instance_settings):
        # TODO save intrinsic configuration, usually using:
        # instance_settings.set_value(k, v)
        pass

    def restore_settings(self, plugin_settings, instance_settings):
        # TODO restore intrinsic configuration, usually using:
        # v = instance_settings.value(k)
        pass

    #def listener():
    #    rospy.init_node('listener', anonymous = True) 
    #    rospy.Subscriber("controller/mode", String, callback) #callback blir en thread
    #    rospy.spin()

    #def callback(self, mode):
    	#rospy.loginfo(mode)
    	#pub = rospy.Publisher('chatter', String, queue_size=10)
    	#pub.publish(mode)
        #if mode != control_mode:
        #    control_mode = mode
        #self._widget.lineControlMode.setText(str(mode))
        #rospy.loginfo(mode)

