/* MSFmultiSelect v1.00
 * Developed by Jagadeesan S
 * jagadeesanjd11@gamil.coms
 * https://minisuperfiles.blogspot.com
 */
class MSFmultiSelect{
  constructor(select, settings = {}) {
    this.select = select;
    this.select.multiple=true;
    this.select.style.display='none';

    this.settings = this._getSettings(settings);

    this.class = {
      searchBox: 'searchbox'
    };

    this.data = {};

    this.create();
    this.log();
  }
  _getSettings(settings) {
    var defultSettings = {
      theme: 'advanced',
      width: '350px',
      height: '20px',
      appendTo:'body',
      className: ''
    };

    var defultSettingsKeys = Object.keys(defultSettings);
    var attr, defultSettingsKeyslen = defultSettingsKeys.length;
    for (var i = 0; i < defultSettingsKeyslen; i++) {
      attr = defultSettingsKeys[i];

      if (attr && settings[attr] !== undefined) continue;
      settings[attr] = defultSettings[attr];
    }

    return settings;
  }
  create() {
    var self = this;
    var addTarget = document.querySelector(this.settings.appendTo);
    var div=document.createElement('DIV');
    div.className='msf_multiselect_container';
    this.id='msf_multiselect_'+(document.querySelectorAll('.msf_multiselect_container').length+1);
    div.id=this.id;

    // Creating theme specific elements here.
    this.settings['theme'] === 'simple' ?
      this._getThemeOneSpecificElems(div) : this._getThemeTwoSpecificElems(div);

    // Creating common elements for both themes here.
    this._getCommonElems(div);

    this.container=div;
    addTarget.appendChild(div);
    // add event
    document.addEventListener('click', function(event) {
      var theme2Specific = self.settings['theme'] === 'simple' ? false : event.target.className === 'closeBtn';
      if (self.container.contains(event.target) || theme2Specific) return;
      self.list.classList.add('hidden');
      self.searchBox.classList.add('hidden');
    });

    this.searchBox.addEventListener('keyup', function(event) {
      var searchVal = event.target.value.toLocaleLowerCase();
      var options = document.querySelectorAll('.msf_multiselect label li');

      self._showAllOptions();
      if (searchVal.length < 1) return;

      var optinVal, option, optionsLen = options.length;
      for (var i = 0; i < optionsLen; i++) {
        option = options[i];
        optinVal = option.innerText.toLocaleLowerCase();

        if (optinVal === '<select all>') continue;
        if (optinVal.indexOf(searchVal) !== 0) {
          option.parentElement.classList.add('hidden');
        }
      }

    });
  }
  setValue(selected = []) {
    if (!selected.length) return;

    var selectChildrenLen = this.select.children.length,
    selectedLen = selected.length,
    selectChild, listChild, selectedIndex, sync;
    var i, j;

    for (i = 0; i < selectChildrenLen; i++) {
      for (j = 0; j < selected.length; j++) {
        selectChild = this.select.children[i];
        selectedIndex = selected[j];

        // TODO: need to change != to !==.
        if (selectChild.value != selectedIndex) continue;

        selectChild.selected = true;
        sync = this.settings.selectAll ? (i + 1) : i;
        listChild = this.list.children[sync];
        listChild.children[0].children[0].checked = true;
        // TODO: need to change.
        listChild.children[0].className = 'active';
        this.data[i] = 1;
        break;
      }
    }
    this.log();

    this.searchBox.value = '';
    this.searchBox.focus();
    this._showAllOptions();
  }
  removeValue(selected = []) {
    if (!selected.length) return;

    var selectChildrenLen = this.select.children.length,
    selectedLen = selected.length,
    selectChild, listChild, selectedIndex, sync;
    var i, j;

    for (i = 0; i < selectChildrenLen; i++) {
      for (j = 0; j < selectedLen; j++) {
        selectChild = this.select.children[i];
        selectedIndex = selected[j];
        if (selectChild.value != selectedIndex) continue;

        selectChild.selected=false;
        sync = this.settings.selectAll ? (i + 1) : i;
        listChild = this.list.children[sync];
        listChild.children[0].children[0].checked = false;
        // TODO: need to change.
        listChild.children[0].className = '';
        this.data[i] = 0;
        break;
      }
    }
    this.log();
  }
  log() {
    this.settings['theme'] === 'simple' ?
      this._ThemeOneSpecific_log() : this._ThemeTwoSpecific_log();
  }
  getData() {
    var data = [];
    var i, selectChildrenLen = this.select.children.length;

    for (i = 0; i < selectChildrenLen; i++) {
      if (!this.select.children[i].selected) continue;
      data.push(this.select.children[i].value);
    }

    return data;
  }
  selectAll(is = false) {
    var data = [];

    var i, selectChildrenLen = this.select.children.length;
    for (i = 0; i < selectChildrenLen; i++) {
      data.push(this.select.children[i].value);
    }

    is ? this.setValue(data) : this.removeValue(data);
  }
  loadSource(data=[]){
    if(data.length!=0){
      this.select.innerHTML='';
      for(var i=0; i<data.length; i++){
        var option=document.createElement('OPTION');
        option.value=data[i].value;
        option.innerHTML=data[i].caption;
        option.selected=data[i].selected;
        this.select.appendChild(option);
      }
      this.reload();
    }
  }
  getSource(){
    var data=[];
    for(var i=0; i<this.select.children.length; i++){
      data.push({value:this.select.children[i].value,caption:this.select.children[i].innerText,selected:this.select.children[i].selected});
    }
    return data;
  }
  reload(){
    this.container.remove();
    this.create();
  }
  _showAllOptions() {
    if (this.list.classList.contains('hidden')) this.list.remove('hidden');
    var options = document.querySelectorAll('.msf_multiselect label li');

    var i, optionsLen = options.length;
    for (i = 0; i < optionsLen; i++) {
      options[i].parentElement.classList.remove('hidden');
    }

  }
  _getCommonElems(wrapper) {
    var self = this;

    var searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.className = this.class['searchBox'];
    // TODO: we should set px or other styles in constructor.
    searchBox.style.width = this.settings.width;
    searchBox.classList.add('hidden');

    var ul = document.createElement('UL');
    ul.className = 'msf_multiselect';
    ul.style.width = this.settings.width;
    ul.classList.add('hidden');

    if (this.settings.selectAll) {
      var label = document.createElement('label');
      var li = document.createElement('LI');
      var input = document.createElement('input');
      input.type = 'checkbox';
      input.disabled = this.settings.readOnly ? true : false;
      input.addEventListener('click', function() {
        this.parentElement.className = this.checked ? 'active' : '';
        self.selectAll(this.checked);
      });

      var caption = document.createTextNode('<Select all>');
      li.appendChild(input);
      li.appendChild(caption);
      label.appendChild(li);
      ul.appendChild(label);
    }

    var i, selectChild, selectChildrenLen = this.select.children.length;
    var label, li, input, caption;

    for(i = 0; i < selectChildrenLen; i++) {
      selectChild = this.select.children[i];
      label = document.createElement('label');
      li = document.createElement('LI');
      input = document.createElement('input');
      input.type = 'checkbox';
      input.disabled = this.settings.readOnly ? true : false;
      input.value = selectChild.value;

      caption = document.createTextNode(selectChild.innerText);
      input.addEventListener('click', function() {
        this.checked ? self.setValue([this.value]) : self.removeValue([this.value]);

        if(typeof self.settings.onChange == 'function') {
          self.settings.onChange(this.checked, this.value, self);
        }
      });
      li.appendChild(input);
      li.appendChild(caption);

      li.className = selectChild.selected ? 'active' : '';
      input.checked = selectChild.selected;
      this.data[i] = selectChild.selected;

      label.appendChild(li);
      ul.appendChild(label);
    }

    wrapper.appendChild(searchBox);
    wrapper.appendChild(ul);

    this.list = ul;
    this.searchBox = searchBox;
  }
  _getThemeOneSpecificElems(wrapper) {
    var self = this;
    var textarea = document.createElement('textarea');
    textarea.style.height = this.settings.height;
    textarea.style.width = this.settings.width;
    textarea.className = this.settings.className;
    textarea.readOnly = true;

    this.logger = textarea;
    wrapper.appendChild(textarea);

    this.logger.addEventListener('click', function() {
      self.list.classList.toggle('hidden');
      self.searchBox.classList.toggle('hidden');
      if (!self.searchBox.classList.contains('hidden')) self.searchBox.focus();
    });
  }
  _getThemeTwoSpecificElems(wrapper) {
    // TODO: this is temporary fix. we need to implement separate element for theme2.
    this._getThemeOneSpecificElems(wrapper);

    var selectedLabelsDiv = document.createElement('div');
    selectedLabelsDiv.className = 'selectedLabelsDiv';
    selectedLabelsDiv.style.width = this.settings.width;
    wrapper.appendChild(selectedLabelsDiv);
  }
  _ThemeOneSpecific_log() {
    var i = 0, option = '', selectedOptions = '';
    var loop_length = this.select.children.length;

    for(i; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) continue;

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }

    this.logger.value = selectedOptions;
  }
  _ThemeTwoSpecific_log() {
    var self=this;
    var selectedLabelsDiv = document.getElementsByClassName('selectedLabelsDiv')[0];
    selectedLabelsDiv.innerHTML = '';

    var i, option = '', selectedOptions = '', selectedLabels, closeBtn;
    var loop_length = this.select.children.length;

    for(i = 0; i < loop_length; i++) {
      option = this.select.children[i];
      if (!this.data[i]) continue;

      selectedLabels = document.createElement('label');
      selectedLabels.className = 'selectedLabels';
      selectedLabels.innerHTML = option.innerText;

      closeBtn = document.createElement('span');
      closeBtn.className = 'closeBtn';
      closeBtn.innerHTML = 'X';
      closeBtn.dataset.id = option.value;
      closeBtn.addEventListener('click', function(event) {
        self.removeValue([event.target.dataset.id]);
      });

      selectedLabels.appendChild(closeBtn);
      selectedLabelsDiv.appendChild(selectedLabels);

      selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
    }
    // TODO: update selectedOptions in input or select box.
    console.log(selectedOptions);
  }
}
