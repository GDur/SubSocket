# -*- coding: utf-8 -*-
import cherrypy

from ws4py.server.cherrypyserver import WebSocketPlugin, WebSocketTool
from ws4py.websocket import WebSocket
from ws4py.messaging import TextMessage

class JsRealtimeWebSocketHandler(WebSocket):
    def received_message(self, message):
        cherrypy.engine.publish('websocket-broadcast', message)

class Root(object):
    @cherrypy.expose
    def index(self):
        return "Open the right HTML file by choosing the Js Realtime build system and using it."

    @cherrypy.expose
    def ws(self):
        cherrypy.log("Handler created: %s" % repr(cherrypy.request.ws_handler))


class Server():

    def stop(self):
        cherrypy.engine.stop()

    def run(self):
        cherrypy.config.update({'server.socket_host': '127.0.0.1',
                                'server.socket_port': 9999,
                                'server.thread_pool': 10,
                                'engine.autoreload.on': False
                                })
                                
        WebSocketPlugin(cherrypy.engine).subscribe()
        cherrypy.tools.websocket = WebSocketTool()

        cherrypy.quickstart(Root(), '', config={
                '/ws': {
                    'tools.websocket.on': True,
                    'tools.websocket.handler_cls': JsRealtimeWebSocketHandler
                    }
                })

if __name__ == '__main__':
    s = Server()
    s.run()