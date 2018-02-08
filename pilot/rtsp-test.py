import kivy
kivy.require('1.10.0')

from kivy.app import App
from kivy.uix.video import Video
from kivy.uix.gridlayout import GridLayout


class MyApp(App):

    def build(self):
        return Videos()


class Videos(GridLayout):

    def __init__(self, **kwargs):
        super(Videos, self).__init__(**kwargs)
        self.cols = 2
        self.add_widget(Video(source='rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov', state='play'))
        self.add_widget(Video(source='rtsp://localhost:8554/bunny', state='play'))
        self.add_widget(Video(source='BigBuckBunny.mp4', state='play'))
        self.add_widget(Video(source='BigBuckBunny.mp4', state='play'))


if __name__ == '__main__':
    MyApp().run()
