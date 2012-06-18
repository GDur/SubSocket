function write(tmp)
{
  if(tmp.type == "VariableDeclaration")
  {
    declar = tmp.declarations[0];    
    return (tmp.kind+ " " +declar.id.name +" = "+declar.init.value+";")
  }
  if(tmp.type == "VariableDeclarator")
  {  
    return (tmp.id+ " " +declar.id.name +" = "+declar.init.value+";")
  }
  if(tmp.type == "ExpressionStatement" )
  {
    return write(tmp.expression);
  }
  if(tmp.type == "CallExpression" )
  {
    var all = (write(tmp.callee)+"(")
    all += write(tmp.arguments[0]);
    for(var i = 1; i < tmp.arguments.length; i++)
    {
      all +=  "," + write(tmp.arguments[i]);
    }
    return all+");";
  }  
  if(tmp.type == "Identifier")
  { 
      return tmp.name;
  }
  if(tmp.type == "Literal")
  { 
      return tmp.value;
  }
  if(tmp.type == "AssignmentExpression" || tmp.type == "BinaryExpression")
  {
    return (write(tmp.left)+ " "+tmp.operator+" " +write(tmp.right)+";" )
  }
  if(tmp.type == "UpdateExpression")
  {
    return (" "+tmp.argument.name+tmp.operator+"" )
  }
  if(tmp.type == "BlockStatement")
  {
    var all = "\n{\n";
    for(var i = 0; i < tmp.body.length; i++)
    {
      all += write(tmp.body[i]);
    }
    return all +"\n}"
  }
  if(tmp.type == "Program")
  {
    var all = "";
    for(var i = 0; i < tmp.body.length; i++)
    {
      all += write(tmp.body[i]);
    }      
    return all
  }
  if(tmp.type == "FunctionDeclaration")
  {
      
    var all =  "function " + write(tmp.id)+"("
    all += write(tmp.params[0]);
    for(var i = 1; i < tmp.params.length; i++)
    {
      all +=  "," + write(tmp.params[i]);
    }
    return all+")"+write(tmp.body);
      
  }
  if(tmp.type == "ForStatement")
  {
    return ("for("+write(tmp.init)+write(tmp.test)+write(tmp.update)+")" +write(tmp.body))
  }
}
pln(write({
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "bla"
            },
            "params": [
                {
                    "type": "Identifier",
                    "name": "a"
                },
                {
                    "type": "Identifier",
                    "name": "b"
                }
            ],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ForStatement",
                        "init": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0
                            }
                        },
                        "test": {
                            "type": "BinaryExpression",
                            "operator": "<",
                            "left": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 20
                            }
                        },
                        "update": {
                            "type": "UpdateExpression",
                            "operator": "++",
                            "argument": {
                                "type": "Identifier",
                                "name": "i"
                            },
                            "prefix": false
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "pln"
                                        },
                                        "arguments": [
                                            {
                                                "type": "Identifier",
                                                "name": "i"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "bla"
                },
                "arguments": [
                    {
                        "type": "Literal",
                        "value": 66
                    },
                    {
                        "type": "Literal",
                        "value": 56
                    }
                ]
            }
        }
    ]
}))