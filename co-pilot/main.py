import rospy
from std_msgs.msg import String
from kivy.app import App
from kivy.properties import StringProperty
from kivy.uix.tabbedpanel import TabbedPanel
from kivy.uix.boxlayout import BoxLayout

import kivy
kivy.require('1.10.0')


class CoPilotRoot(BoxLayout):
    pass


class Tabs(TabbedPanel):
    receive = StringProperty()

    def __init__(self, **kwargs):
        super(Tabs, self).__init__(**kwargs)
        rospy.Subscriber('/new_text/', String, self.update_text)

    def update_text(self, message):
        print(message.data)
        self.receive = message.data


class CoPilotApp(App):
    pass


def shutdown():
    App.get_running_app().stop()


if __name__ == '__main__':
    rospy.on_shutdown(shutdown)
    rospy.init_node('talker', anonymous=True)
    CoPilotApp().run()
