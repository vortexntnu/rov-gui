import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView

#from vortex_msgs.msg import CameraFeedSelection


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
        ui_file = os.path.join(rp.get_path('rqt_vortex_camera_selection'), 'resource', 'MyPlugin.ui')
        
        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('MyPluginUi')

        #Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)


        #self.pub = rospy.Publisher('camera_feed_selection', CameraFeedSelection, queue_size=10)

        self._widget.comboBox_feed0.currentIndexChanged.connect(self.camera_selection)
        self._widget.comboBox_feed1.currentIndexChanged.connect(self.camera_selection)
        self._widget.comboBox_feed2.currentIndexChanged.connect(self.camera_selection)

    def camera_selection(self):
        #Get cam on feed
        feed0_cam = self._widget.comboBox_feed0.currentIndex()
        feed1_cam = self._widget.comboBox_feed1.currentIndex()
        feed2_cam = self._widget.comboBox_feed2.currentIndex()

        print '------------------------'
        print 'Feed0: ' + str(feed0_cam)
        print 'Feed1: ' + str(feed1_cam)
        print 'Feed2: ' + str(feed2_cam)
        #Publich message
        #pub.publish(hello_str)

    def shutdown_plugin(self):
        #self.stop_publishing('camera_feed_selection')
        pass
