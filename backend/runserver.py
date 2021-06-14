import socket, subprocess, sys

PORT = '8000'

def get_ip_address():
    '''Return IP adress'''
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address


def get_python_path():
    '''Return venv python path'''
    path_list = sys.path
    path_filtered = filter(lambda path: path.endswith(r'\venv'), path_list)
    return next(path_filtered, None)


def put_ip_in_api_file(folder: str):
    '''Put ip address in api.js'''
    FILE_PATTERN = 'const ROTA_API'
    file_path = fr'../{ folder }/src/services/api.ts'

    with open(file_path, 'r+') as f:
        lines = f.readlines()
        f.seek(0)

        for line in lines:
            if not line.startswith(FILE_PATTERN):
                f.write(line)
            else:
                f.write(f'{ FILE_PATTERN } = `{ get_ip_address() }`\n')

        f.truncate()


def main():
    '''Run'''
    subprocess.call(f'{ get_python_path() }\Scripts\python.exe manage.py runserver { get_ip_address() }:{ PORT }')


if __name__ == '__main__':
    put_ip_in_api_file('web')
    put_ip_in_api_file('mobile')
    main()
