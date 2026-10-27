"""
==============================================================================
 VAULT // X — Quantum Wealth & Expense OS
 Local Server & Launcher
==============================================================================
"""

import http.server
import socketserver
import webbrowser
import threading
import os
import sys
import time

PORT = 5050
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stdout.write(f"\033[92m[VAULT//X LOG]\033[0m {self.address_string()} - {format % args}\n")

def open_browser(port):
    time.sleep(1.0)
    url = f"http://localhost:{port}"
    print(f"\033[92m[+] Abrindo navegador em {url}...\033[0m")
    webbrowser.open(url)

def run():
    os.chdir(DIRECTORY)
    
    # ASCII Art Banner
    banner = r"""
    ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗    ██╗  ██╗
    ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝    ╚██╗██╔╝
    ██║   ██║███████║██║   ██║██║     ██║        ╚███╔╝ 
    ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║        ██╔██╗ 
     ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║       ██╔╝ ██╗
      ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝       ╚═╝  ╚═╝
          -- Q U A N T U M   W E A L T H   O S --
    """
    print(f"\033[92m{banner}\033[0m")
    print("\033[90m" + "="*68 + "\033[0m")
    print(f"\033[96m[SISTEMA]\033[0m Sistema de Gestão Financeira Inteligente inicializado.")
    print(f"\033[96m[SISTEMA]\033[0m Cartão 3D & Simulador de Juros Compostos (17 aos 30 anos) prontos.")
    print(f"\033[96m[SISTEMA]\033[0m Diretório raiz: {DIRECTORY}")
    print("\033[90m" + "="*68 + "\033[0m")

    # Pick available port
    current_port = PORT
    server = None
    for p in range(current_port, current_port + 20):
        try:
            socketserver.TCPServer.allow_reuse_address = True
            server = socketserver.TCPServer(("", p), Handler)
            current_port = p
            break
        except OSError:
            continue

    if not server:
        print("\033[91m[-] Não foi possível vincular o servidor em portas disponíveis.\033[0m")
        sys.exit(1)

    print(f"\033[92m[✓] Servidor HTTP local ativo em: \033[1mhttp://localhost:{current_port}\033[0m")
    print("\033[90m[i] Pressione Ctrl+C para encerrar o servidor a qualquer momento.\033[0m\n")

    threading.Thread(target=open_browser, args=(current_port,), daemon=True).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n\033[93m[!] Servidor encerrado. Seus dados estão salvos no navegador!\033[0m")
        server.server_close()

if __name__ == '__main__':
    run()

