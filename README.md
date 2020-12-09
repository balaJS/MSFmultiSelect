# MSFmultiSelect
MSFmultiSelect (multiselect) is a pure JavaScript user-friendly multiselect library, don't need jQuery. It's very easy to use for developers and fast.
### [Documentation (Demo)](https://minisuperfiles.blogspot.com/p/documentation.html?project=msfmultiselect) | [Try it (JSFiddle)](http://jsfiddle.net/afabbro/vrVAP/) | [Download](https://github.com/minisuperfiles/MSFmultiSelect/archive/1.0.zip)
## Installation
Use npm to install the latest version.
```
npm install github:minisuperfiles/MSFmultiSelect
```
Alternatively, you can simply embed it in your HTML file.
```html
<script src="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFmultiSelect/msfmultiselect.js"></script>
<link href="https://cdn.jsdelivr.net/gh/minisuperfiles/MSFmultiSelect/msfmultiselect.css" rel="stylesheet"/>
```
## Usage Example
```html
<script src="msfmultiselect.js"></script>
<link rel="stylesheet" type="text/css" href="msfmultiselect.css"/>
<div id="myselect">
  <select id="multiselect" name="languages[]" multiple="multiple">
    <option value="1" selected>HTML</option>
    <option value="2" selected>CSS</option>
    <option value="3">MySql</option>
    <option value="4">XML</option>
    <option value="5">JSON</option>
    <option value="6">YAML</option>
    <option value="7">MongoDB</option>
    <option value="8">SQLite</option>
  </select>
</div>
<script>
var select2 = new MSFmultiSelect(
  document.querySelector('#multiselect'),
  {
    selectAll: true,
    searchBox: true,
    onChange:function(checked, value, instance) {
      console.log(checked, value, instance);
    }
  }
);
</script>
```
## Syntax (arguments)
```
new MSFmultiSelect(element)
new MSFmultiSelect(element,settings)

element = document.getElementById('multiselect')
settings = {
 width:350,
 height:40,
 className:'myclass',
 onChange:function(checked,value,instance){
  console.log(checked,value,instance);
 },
 selectAll:true,
 searchBox: true,
 appendTo:'#myselect',
 readOnly:true
}
```
### element
Give DOM select element, this element posted in your backend.
### settings (Optional)
Give the object of settings your multiselect.
<ol type="1"><li><b>appendTo</b> : give element selector string, it uses to target place to create multiselect.</li>
<li><b>width</b> : It is control of the mulitiselect width.</li>
  <li><b>height</b> :  It is control of the mulitiselect height.</li>
  <li><b>className</b> : if you need any custom style, give css class name, it will apply to mulitiselect.</li>
  <li><b>onChange</b> : when it changed, this callback function, there is three-parameter in this function.<ol type="i"><li><b>checked</b> : you receive boolean data, selected item checked, or unchecked.</li>
  <li><b>value</b> : you get selected item value.</li>
  <li><b>instance</b> : it's instance variable of mulitiselect, you can access multiselect properties and methods</li></ol></li>
  <li><b>selectAll</b> : if you give true value, select all options to enable.</li>
  <li><b>readOnly</b> :  if you give true value, the user can not modify multiselect options.</li></ol>
  <li><b>theme</b> : There are two themes available. They are ```javascript 'theme1' ``` and ```javascript 'theme2' ```. theme1 is a regular multi-select, theme2 multi-select have directly remove selected value option button.</li></ol>
<h5>MSFmultiSelect Methods</h5><dl>
  <dt><code>MSFmultiSelect.setValue(sellectedValues)</code></dt>
<dd>This method used to add selected values, this method needs one argument, that argument value has select option values in an array format.<ul>
<li><b>code</b> : <code>select.setValue(['4','8']); //give select option values in array</code></li></ul></dd>
<dt><code>MSFmultiSelect.removeValue(removeSellectedValues)</code></dt>
  <dd>This method used to remove selected values, this method needs one argument, that argument value has select option values in an array format.<ul>
<li><b>code</b> : <code>select.removeValue(['4','8']); //give select option values in array</code></li></dd>
<dt><code>MSFmultiSelect.getData()</code></dt>
  <dd>This methods use to get selected values of mulitiselect<ul>
<li><b>code</b> : <code> console.log(select.getData());</code></li></ul></dd>
<dt><code>MSFmultiSelect.selectAll(ctrlSwitch)</code></dt>
  <dd>This method uses to select all option in the multiselect list or unselect all option in the list, this method needs one argument and its boolean value, if give true, select all option in multiselect list or you give false value unselect all in multiselect list.<ul>
<li><b>code</b> : <code> select.selectAll(true); select.selectAll(false);</code></li></ul></dd>
  <dt><code>MSFmultiSelect.loadSource(options)</code></dt>
  <dd>This method uses to load options in multiselect. This method needs one argument and its need array format.<ul>
<li><b>formet</b> : 
```javascript
    var options=[
        {caption:'optiontext1',value:'optionvalue1',selected:true},
        {caption:'optiontext2',value:'optionvalue2',selected:false}
    ];
```
</li>
</ul></dd><dt><code>MSFmultiSelect.getSource()</code></dt>
<dd>This method uses to get current source data, it will return the array format.<ul>
<li><b>code</b> : <code> console.log(select.getSource());</code></li></ul></dd><dt><code>MSFmultiSelect.reload()</code></dt><dd>This use to recreate the mulitselect.<ul>
<li><b>code</b> : <code>select.reload();</code></li></ul></dd></dl>
<a target="_blank" href="https://minisuperfiles.blogspot.com/p/documentation.html?project=msfmultiselect" >View Documentation (Demo)</a>

<p>Learn more about in <a target="_blank" href="https://minisuperfiles.blogspot.com" >minisuperfiles.blogspot.com</a></p>
