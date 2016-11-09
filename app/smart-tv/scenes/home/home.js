goog.provide('SmartTv.scenes.Home');
goog.require('zb.layers.CuteScene');
goog.require('SmartTv.scenes.templates.home.home');

goog.require('zb.ui.BaseList');
goog.require('zb.xhr.simple');

/**
 * @constructor
 * @extends {zb.layers.CuteScene}
 */
SmartTv.scenes.Home = function() {
  goog.base(this);

  var self = this;

  zb.xhr.simple.send('GET', 'http://webcaster.pro/api/admin/events.json')
    .then(function(xhr) {
      var items = JSON.parse(xhr.responseText);

      console.log(items.length);

      var res = [];
      for(var i = 0, length = items.length; i < length; i++) {
        res.push(items[i].name);
      }

      var source = new zb.ui.DataList(res);
      self._exported.list.setSource(source);
    })
    .catch(function(xhr) {
      console.error(xhr);
    })

};
goog.inherits(SmartTv.scenes.Home, zb.layers.CuteScene);


/** @inheritDoc */
SmartTv.scenes.Home.prototype._renderTemplate = function() {
	return SmartTv.scenes.templates.home.home(this._getTemplateData(), this._getTemplateOptions());
};


/**
 * @type {SmartTv.scenes.templates.home.HomeOut}
 * @protected
 */
SmartTv.scenes.Home.prototype._templateResult;

zb.ui.BaseList.prototype.mouseClick = function(data) {
  alert('click');
};
