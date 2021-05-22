import socket


def get_ip_address():
    '''Return IP adress'''
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    print(f'Seu IPV4: { ip_address }')


if __name__ == '__main__':
    get_ip_address()
