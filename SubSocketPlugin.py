# -*- coding: utf-8 -*-
import sublime, sublime_plugin
import threading
import subprocess
import os
import time
from ws4py.client import WebSocketBaseClient


__all__ = ['WebSocketClient']

class WebSocketClient(WebSocketBaseClient):
    def __init__(self, url, protocols=None, extensions=None):
        WebSocketBaseClient.__init__(self, url, protocols, extensions)
        self._th = threading.Thread(target=self.run, name='WebSocketClient')
        self._th.daemon = True

    @property
    def daemon(self):
        return self._th.daemon

    @daemon.setter
    def daemon(self, flag):
        self._th.daemon = flag

    def handshake_ok(self):
        self._th.start()
        self._th.join(timeout=1.0)


class JsRealtimeClient(WebSocketClient):
    def sendCode(self, code):
        self.send(code)

    def closed(self, code, reason=None):
        print code, reason


# Thread that tries to connect to the server and if that does not work opens a server and connects again
class Connecter(threading.Thread):
    def __init__(self, websocket, serverExe):
        self.ws = websocket
        self.serverExe = serverExe
        threading.Thread.__init__(self)

    def run(self):
        try:
            print "Trying to connect to Js Realtime server."
            self.ws.connect()
        except:
            print "Starting Js Realtime server..."
            subprocess.Popen([self.serverExe], shell = True)
            time.sleep(4) # Give the server time to start
            try:
                self.ws.connect()
            except:
                print "Error: Starting the server or connecting failed."



class JSRealtime(sublime_plugin.EventListener):
    def __init__(self):
        self.serverExe = sublime.packages_path() + "\SubSocket\Server.py"   
        self.connecting = False
        self.connected = False
        self.connectingThread = None

        self.establishConnection() # Try to connect


    def establishConnection(self):
        if not self.connecting:
            self.ws = JsRealtimeClient('ws://localhost:9999/ws', protocols=['http-only', 'chat'])
            self.connectingThread = Connecter(self.ws, self.serverExe)
            self.connectingThread.start()
            self.connecting = True
        else:
            # Check if the connection thread finished
            if not self.connectingThread.isAlive():
                self.connected = True
                self.connecting = False


    def sendCode(self, view):
        if (self.connected):
            try:
                region = sublime.Region(0, view.size())
                code = view.substr(region)
                self.ws.sendCode(code)
            except:
                self.connected = False
        else:
            self.establishConnection()


    def on_modified(self, view):
        self.sendCode(view)

    def onActivated(self, view):
        self.sendCode(view)