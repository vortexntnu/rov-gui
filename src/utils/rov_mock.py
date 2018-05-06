#!/usr/bin/env python
import rospy
from std_msgs.msg import Empty, Float64, Float64MultiArray
from geometry_msgs.msg import Point
from random import random
x = 0
y = 0


def rov_mock():
    rospy.init_node('rov_mock')
    rospy.Timer(rospy.Duration(0.1), angle_publisher)
    rospy.Timer(rospy.Duration(5), data_publisher)
    rospy.Timer(rospy.Duration(5), voltage_publisher)
    rospy.Timer(rospy.Duration(0.5), is_alive_publisher)
    rospy.spin()


def angle_publisher(_):
    pub = rospy.Publisher('obs/angles', Point, queue_size=1)
    global x
    global y
    x = (x + random() * 0.4 - 0.2) / 1.01
    y = (y + random() * 0.4 - 0.2) / 1.01
    pub.publish(Point(x=x, y=y))


def data_publisher(_):
    pub = rospy.Publisher('obs/data', Float64MultiArray, queue_size=1)
    array = [random()*20 - 10 for _ in range(16)]
    pub.publish(Float64MultiArray(data=array))


def voltage_publisher(_):
    pub = rospy.Publisher('obs/voltage', Float64, queue_size=1)
    pub.publish(random() * 5)


def is_alive_publisher(_):
    pub = rospy.Publisher('is_alive', Empty, queue_size=1)
    pub.publish()


if __name__ == '__main__':
    try:
        rov_mock()
    except rospy.ROSInterruptException:
        pass
