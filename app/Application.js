function loadLocale() {
  var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
      file = Ext.util.Format.format('resources/locale/{0}.js', lang),
      extJsFile = Ext.util.Format.format('ext/packages/ext-locale/build/ext-locale-{0}.js', lang);

  Ext.Loader.loadScript({
    url: file,
    onError: function () {
      alert('Error loading locale file. Please contact system administrator.');
    }
  });

  Ext.Loader.loadScript({
    url: extJsFile
  });
}

loadLocale();

/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Packt.Application', {
  extend: 'Ext.app.Application',
  
  name: 'Packt',

  stores: [
    // TODO: add global / shared stores here
  ],

  views: [
    'login.Login'
  ],

  controllers: [
    'Menu'
  ],

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
