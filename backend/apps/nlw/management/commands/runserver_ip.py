from django.conf import settings
from django.core.management.commands import runserver
import socket

def get_ip_address():
    '''Return IP adress'''
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address

class Command(runserver.Command):
    default_port = '8000'
    default_addr = get_ip_address()
