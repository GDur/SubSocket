
      // Public Domain code by Christopher Diggins
      // http://www.cdiggins.com
      // Last Modified 2005-10-28
      Array.prototype.has=function(v)
      {
        for (i=0;i<this.length;i++)
        {
          if (this[i]==v) return i;
        }
        return false;
      }
      function oc(a)
      {
        var o = {};
        for(var i=0;i<a.length;i++)
        {
          o[a[i]]='';
        }
        return o;
      }
      function js_tokenizer(input) 
      {
        var keywords = oc("abstract boolean break byte case catch char class const continue debugger default delete do double 	else enum export extends false final finally float for function goto if implements import in 	instanceof int interface long native new null package private protected public return short static super 	switch synchronized this throw throws transient true try typeof var void volatile while with".split(" "));        
        var re_line_comment = /\/\/.*\r/
        var re_full_comment = /\/\*(?:.|[\n\r])*?\*\//
        var re_ident = /[a-zA-Z_][a-zA-Z0-9_]*\b/
        var re_integer = /[+-]?\d+/
        var re_float = /[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?/
        var re_doublequote = /["][^"]*["]/
        var re_singlequote = /['][^']*[']/
        var re_tab = /\t/
        var re_nl = /\r/
        var re_space = /\s/
        var re_symbol = /\S/
        var re_token = /\/\/.*\r|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|["][^"]*["]|['][^']*[']|./g
        var a = input.match(re_token);
        var s = ""; // "<tokens lang='javascript' version='1.0'>\n"
        var tmpString = "";
        var record = true;
        for (i = 0; i < a.length; i++) {
          var token = a[i];
          if (token.match(re_line_comment)) {
            //s = s + "<linecomment>" + token + "</linecomment>\n";
            //s = s + "" + token + "";
          }
          else if (token.match(re_full_comment)) {
            //s = s + "<fullcomment>" + token + "</fullcomment>\n";
            //s = s + "" + token + "";
          }
          else if (token.match(re_singlequote)) {
           // s = s + "<qstr>" + token + "</qstr>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_doublequote)) {
           // s = s + "<qqstr>" + token + "</qqstr>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_ident)) 
          {
            if(!(token in keywords))
            {
              test = "" + token + "";
              
              s = s + "" + token + "";
            }else
            {            
              s = s + "" + token + "";
            }
          }
          else if (token.match(re_float)) {
            //s = s + "<real>" + token + "</real>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_integer)) {
            //s = s + "<int>" + token + "</int>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_space)) {
            //s = s + "<ws/>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_nl)) {
            //s = s + "<nl/>\n";
            s = s + "" + token + "";
          }
          else if (token.match(re_tab)) {
            //s = s + "<tab/>\n";
            s = s + "" + token + "";
          }
          else if (token == ">") {
            //s = s + "<sym>&gt;</sym>\n"
            s = s + "" + token + "";
          }
          else if (token == "<") {
            //s = s + "<sym>&lt;</sym>\n"
            s = s + "" + token + "";
          }
          else  if (token == "&") {
            //s = s + "<sym>&amp;</sym>\n"
            s = s + "" + token + "";
          }
          else 
          {
            if(token == ";" || "\\n" == token)
            {
              s = s + "" + token + "\n"+tmpString;
              tmpString = "";
            }else if(token == "=")
            {
              //s = s + "<sym>" + token + "</sym>\n"
              s = s + "" + token + "";
              if(record)
              {
                tmpString = ";\nrealtimeoutput(\"" + test+" = \"+"  +  test+"+\"\\n\");\n"
              }else
              {
                tmpString = "\n";              
              }
            }else if(token == "(")
            {
              s = s + "" + token + "";
              record = false;
            }else if(token == ")")
            {
              s = s + "" + token + "";
              record = true;
            }else
            {
              s = s + "" + token + "";
            }
          }
        }
        //s = s + "</tokens>";
        return s;
      }
      function tokenize(input) 
      {
        return js_tokenizer(input);
      }