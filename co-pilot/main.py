import rospy
from std_msgs.msg import String
from kivy.app import App
from kivy.properties import StringProperty
from kivy.uix.tabbedpanel import TabbedPanel
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.clock import Clock

import kivy
kivy.require('1.10.0')


class CoPilotRoot(BoxLayout):
    pass


class Tabs(TabbedPanel):
    receive = StringProperty()

    def __init__(self, **kwargs):
        super(Tabs, self).__init__(**kwargs)
        rospy.Subscriber('/new_text', String, self.update_text)

    def update_text(self, message):
        print(message.data)
        self.receive = message.data


class HealthLabel(BoxLayout):
    num = 'imu'
    icon = StringProperty()

    def __init__(self, **kwargs):
        super(HealthLabel, self).__init__(**kwargs)
        Clock.schedule_once(self.late_init)
        self.life_timer = Clock.schedule_once(self.die, .5)

    def late_init(self, dt):
        rospy.Subscriber('/heartbeat/' + str(self.num), String, self.ping)

    def say_num(self):
        print(self.num)

    def ping(self, dt):
        self.icon = 'success.png'
        self.life_timer.cancel()
        self.life_timer()

    def die(self, dt):
        self.icon = 'error.png'


class CoPilotApp(App):
    pass


def shutdown():
    App.get_running_app().stop()


if __name__ == '__main__':
    rospy.on_shutdown(shutdown)
    rospy.init_node('co_pilot')
    CoPilotApp().run()
