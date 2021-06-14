import socket


def get_api_route():
    '''Return IP adress'''
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    print(f'ROTA API: { ip_address }:8000')


if __name__ == '__main__':
    get_api_route()
