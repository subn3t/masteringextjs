Ext.define('Packt.view.security.UserModel', {
	extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.user',

  stores: {
    users: {
      model: 'Packt.model.security.User',
      autoLoad: true
    },
    groups: {
    	model: 'Packt.model.security.Group',
    	autoLoad: true
    }
  }
  
});