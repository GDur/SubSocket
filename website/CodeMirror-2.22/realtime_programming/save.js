function Cookie()
{

}
var cookie = new Cookie();

cookie.get = function (name)
{
  var a = document.cookie.split(";")
  for(var i = 0; i < a.length; i++)
  {
    var tmp = a[i].split("=");
    if($.trim(tmp[0]) == name)
    {
      message = tmp[1].replace(/\/break/g, "\u000A").replace(/\/equal/g, "=").replace(/\/quotation/g, "\"").replace(/\/semicolon/g, ";");
      return(message)
    }
  }
  return undefined;
}

cookie.length = function ()
{
  return document.cookie.split(";").length;
}
function replacer(key, value) 
{
  if (typeof value === 'number' && !isFinite(value)) 
  {
      return String(value);
  }
  return value;
}

cookie.setJson = function (name, message)
{
  var ablauf = new Date();
  var infuenfTagen = ablauf.getTime() + (5 * 24 * 60 * 60 * 1000);
  ablauf.setTime(infuenfTagen);
  message = JSON.stringify(message, replacer).replace(/\n/g, "/break").replace(/=/g, "/equal").replace(/"/g, "/quotation").replace(/;/g, "/semicolon");
  document.cookie = name + "=" + message + "; expires=" + ablauf.toGMTString();
}
cookie.getJson = function (name)
{
  return JSON.parse(eval('(' + "cookie.get('" + name + "')" + ')'));
}
cookie.set = function (name, message)
{
  var ablauf = new Date();
  var infuenfTagen = ablauf.getTime() + (5 * 24 * 60 * 60 * 1000);
  ablauf.setTime(infuenfTagen);
  message = message.replace(/\n/g, "/break").replace(/=/g, "/equal").replace(/"/g, "/quotation").replace(/;/g, "/semicolon");
  document.cookie = name + "=" + message + "; expires=" + ablauf.toGMTString();
}