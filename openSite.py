import sublime, sublime_plugin
import subprocess
import webbrowser
import string

class OpenSubSocketCommand(sublime_plugin.ApplicationCommand):
	def __init__(self):
		self.site = sublime.packages_path() + "\SubSocket\website\CodeMirror-2.22\\realtime_programming\\rt_programming.html"

	def run(self):
		webbrowser.open(self.site, new = False)