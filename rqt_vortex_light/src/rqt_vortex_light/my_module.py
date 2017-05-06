import os
import rospkg
import rospy

from qt_gui.plugin import Plugin
from python_qt_binding import loadUi
from python_qt_binding.QtWidgets import QWidget, QGraphicsView

from vortex_msgs.msg import LightInput

ON = 100
OFF = 0

class MyPlugin(Plugin):
    def __init__(self, context):
        #PLUGIN CODE
        super(MyPlugin, self).__init__(context)

        # Give QObjects reasonable names
        self.setObjectName('VortexLight')
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
        ui_file = os.path.join(rp.get_path('rqt_vortex_light'), 'resource', 'MyPlugin.ui')
        
        # Extend the widget with all attributes and children from UI file
        loadUi(ui_file, self._widget)

        # Give QObjects reasonable names
        self._widget.setObjectName('VortexLightUi')

        #Makes it possible to open more than one of each plugin
        if context.serial_number() > 1:
            self._widget.setWindowTitle(self._widget.windowTitle() + (' (%d)' % context.serial_number()))
        # Add widget to the user interface
        context.add_widget(self._widget)

        self._widget.btn_ramen.setCheckable(True)
        self._widget.btn_bluetooth.setCheckable(True)

        self._widget.btn_ramen.setStyleSheet("""QPushButton {
            background-color: red; 
            border-radius: 8px;
            color: black;
            }""")
        
        self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
            background-color: red; 
            border-radius: 8px;
            color: black;
            }""")        

        self._widget.btn_ramen.toggled.connect(self.handle_ramen_clicked)
        self._widget.btn_bluetooth.toggled.connect(self.handle_bluetooth_clicked)
        self._widget.horizontalSlider_frontLight.sliderMoved.connect(self.handle_slider_moved)

        self.pub = rospy.Publisher('light_node', LightInput, queue_size=10)


    def handle_ramen_clicked(self):
        try:
            if self._widget.btn_ramen.isChecked(): 
                self.pub.publish('raman', ON)
           
                self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: green; 
                    border-radius: 8px;
                    color: black;
                    }""")

                print 'raman on'

            else:
                self.pub.publish('raman', OFF)
                self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: red; 
                    border-radius: 8px;
                    color: black;
                    }""")

                print 'raman off'

        except rospy.ServiceException, e:
            print "Publish call failed: %s"%e
           
            #Sets the button green ---- SHOULD IT THOUGH?????
            self._widget.btn_ramen.setStyleSheet("""QPushButton {
                    background-color: red; 
                    border-radius: 8px;
                    color: black;
                    }""")

            #Unchecks to avoid trouble when restart
            self._widget.btn_ramen.setChecked(False)

    def handle_bluetooth_clicked(self):
        try:
            if self._widget.btn_bluetooth.isChecked(): 
                self.pub.publish('bluetooth', ON)
           
                self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: green; 
                    border-radius: 8px;
                    color: black;
                    }""")

                print 'bluetooth on'

            else:
                self.pub.publish('bluetooth', OFF)
                self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: red; 
                    border-radius: 8px;
                    color: black;
                    }""")

                print 'bluetooth off'

        except rospy.ServiceException, e:
            print "Publish call failed: %s"%e
           
            #Sets the button green ---- SHOULD IT THOUGH?????
            self._widget.btn_bluetooth.setStyleSheet("""QPushButton {
                    background-color: red; 
                    border-radius: 8px;
                    color: black;
                    }""")

            #Unchecks to avoid trouble when restart
            self._widget.btn_bluetooth.setChecked(False)

    def handle_slider_moved(self):
        try:
            intensity = self._widget.horizontalSlider_frontLight.value()
            self.pub.publish('front', intensity)
            print 'front: ' + str(intensity)

        except rospy.ServiceException, e:
            print "Publish call failed: %s"%e            

    def shutdown_plugin(self):
        pass
