function showVar(name, value)
{
  return ";pln(\""+name + " = \" + " + name+")";
}

function deparse(tmp)
{
  if(tmp == undefined)
    return "";
  if(tmp.type == "VariableDeclaration")
  {
    return tmp.kind + " "  + deparse(tmp.declarations[0])+";";
  }
  if(tmp.type == "EmptyStatement")
  {
    return "";    
  }
  if(tmp.type == "IfStatement")
  {
    var el = ""
    if(tmp.alternate != undefined)
    {
      el += "else"+deparse(tmp.alternate)
    }
    return "if("+ deparse(tmp.test)+")" + deparse(tmp.consequent)+"" +  el;    
  }
  
  if(tmp.type == "VariableDeclarator" )
  {
    return deparse(tmp.id)+" = " +deparse(tmp.init)+showVar(deparse(tmp.id), deparse(tmp.init));
  }
  if(tmp.type == "ExpressionStatement" )
  {
    return deparse(tmp.expression)+";";
  }
  if(tmp.type == "CallExpression")
  {
    var all = (deparse(tmp.callee)+"(")
    if(tmp.arguments[0] != undefined)
      all += deparse(tmp.arguments[0]);
    for(var i = 1; i < tmp.arguments.length; i++)
    {
      all +=  "," + deparse(tmp.arguments[i]);
    }
    return all+")";
  }  
  if(tmp.type == "NewExpression" )
  {
    var all = "new "+(deparse(tmp.callee)+"(")
    if(tmp.arguments[0] != undefined)
      all += deparse(tmp.arguments[0]);
    for(var i = 1; i < tmp.arguments.length; i++)
    {
      all +=  "," + deparse(tmp.arguments[i]);
    }
    return all+")";
  }  
  if(tmp.type == "Identifier")
  { 
      return tmp.name;
  }
  if(tmp.type == "Literal")
  { 
    if(typeof tmp.value == "number")
    {
      return tmp.value;
    }else
    {
      return "\""+tmp.value+"\"";    
    }
  }
  if(tmp.type == "AssignmentExpression" )
  {
    
    return (deparse(tmp.left)+ " "+tmp.operator+" " +deparse(tmp.right)+";" +showVar(deparse(tmp.left), eval(deparse(tmp.left))))
  }
  if(tmp.type == "BinaryExpression")
  {
    return (deparse(tmp.left)+ " "+tmp.operator+" " +deparse(tmp.right)+"" )
  }
  if(tmp.type == "MemberExpression")
  {
    if(tmp.computed == true)
    {
      return (deparse(tmp.object)+ "[" +deparse(tmp.property)+"]" )
    }else
    {
      return (deparse(tmp.object)+ "." +deparse(tmp.property)+"" )
    }
  }
  if(tmp.type == "UpdateExpression")
  {
    return (" "+tmp.argument.name+tmp.operator+"" )
  }
  if(tmp.type == "BlockStatement")
  {
    var all = "{";
    for(var i = 0; i < tmp.body.length; i++)
    {
      all += deparse(tmp.body[i]);
    }
    return all +"}"
  }
  if(tmp.type == "Property")
  {
    return deparse(tmp.key)+" : " +deparse(tmp.value);    
  }
  if(tmp.type == "ReturnStatement")
  {
    return "return "+deparse(tmp.argument)+";";    
  }
  
  if(tmp.type == "ObjectExpression")
  {
    var all = "{";
    if(tmp.properties[0] != undefined)
      all += deparse(tmp.properties[0]);
    for(var i = 1; i < tmp.properties.length; i++)
    {
      all += ", "+deparse(tmp.properties[i]);
    }
    return all +"}"
  }
  if(tmp.type == "ArrayExpression")
  {
    var all = "[";
    if(tmp.elements[0] != undefined)
      all += deparse(tmp.elements[0]);
    for(var i = 1; i < tmp.elements.length; i++)
    {
      all += ", "+deparse(tmp.elements[i]);
    }
    return all +"]"
  }
  if(tmp.type == "Program")
  {
    var all = "";
    for(var i = 0; i < tmp.body.length; i++)
    {
      all += deparse(tmp.body[i]);
    }      
    return all
  }
  if(tmp.type == "FunctionDeclaration" || tmp.type ==  "FunctionExpression" ) 
  {
      
    var all =  "function " + deparse(tmp.id) +"("
    if(tmp.params[0] != undefined)
      all += deparse(tmp.params[0]);
    for(var i = 1; i < tmp.params.length; i++)
    {
      all +=  "," + deparse(tmp.params[i]);
    }
    return all+")"+deparse(tmp.body)+"";
      
  }
  if(tmp.type == "ForStatement")
  {
    return ("for("+deparse(tmp.init)+" "+deparse(tmp.test)+"; "+deparse(tmp.update)+")" +deparse(tmp.body))
  }
}