function loadLocale(){

    var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
        extJsFile = Ext.util.Format.format("ext/packages/ext-locale/build/ext-locale-{0}.js", lang);

    Ext.Loader.loadScript({url: extJsFile});
}

loadLocale();

Ext.require('Packt.view.login.Login');
Ext.require('Packt.view.main.Main');
Ext.require('Packt.view.menu.Tree');

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Packt.Application', {
  extend: 'Ext.app.Application',
  
  name: 'Packt',

  glyphFontFamily: 'FontAwesome',

  stores: [
    // TODO: add global / shared stores here
  ],

  views: [
    'login.Login'
    // 'security.User' // WHY??
  ],

  controllers: [
    'Menu'
  ],

  requires: [
    'Packt.overrides.tree.ColumnOverride'
    // 'Packt.util.Glyphs' // WHY??
  ],

  glyphFontFamily: 'FontAwesome',

  enableQuickTips: true,

  launch: function () {
    var me = this;
    var task = new Ext.util.DelayedTask(function() {
      me.splashscreen.fadeOut({
        duration: 1000,
        remove: true
      });

      me.splashscreen.next().fadeOut({
        duration: 1000,
        remove: true,
        listeners: {
          afteranimate: function(el, startTime, eOpts) {
            Ext.widget('login-dialog');
          }
        }
      })
    });

    task.delay(2000);
  },

  init: function() {
    var me = this;
    me.splashscreen = Ext.getBody().mask(
      'Loading application', 'splashscreen'
    );

    me.splashscreen.addCls('splashscreen');

    Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
      cls: 'x-splash-icon'
    });
  }

});
