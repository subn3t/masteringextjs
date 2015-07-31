Ext.define('Packt.view.login.Login', {
	requires: [
		'Packt.view.login.LoginController'
	],
	controller: 'login',
	extend: 'Ext.window.Window',
	xtype: 'login-dialog',
	autoShow: true,
	height: 170,
	width: 360,
	layout: {
		type: 'fit'
	},
	iconCls: 'fa fa-key fa-lg',
	title: 'Login',
	closeAction: 'hide',
	closable: false,
	draggable: false,
	resizable: false,
	items: [{
		xtype: 'form',
		reference: 'form',
		bodyPadding: 15,
		defaults: {
			xtype: 'textfield',
			anchor: '100%',
			labelWidth: 60,
			allowBlank: false,
			vtype: 'alphanum',
			minLength: 3,
			msgTarget: 'under'
		},
		items: [{
			name: 'user',
			fieldLabel: 'User',
			maxLength: 25,
			listeners: {
				specialKey: 'onTextFieldSpecialKey'
			}
		}, {
			id: 'password',
			inputType: 'password',
			name: 'password',
			fieldLabel: 'Password',
			vtype: 'customPass',
			msgTarget: 'side',
			enableKeyEvents: true,
			listeners: {
				specialKey: 'onTextFieldSpecialKey',
				keypress: 'onTextFieldKeyPress'
			}
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				xtype: 'tbfill'
			}, {
				xtype: 'button',
				iconCls: 'fa fa-times fa-lg',
				text: 'Cancel',
				listeners: { click: 'onButtonClickCancel' }
			}, {
				xtype: 'button',
				formBind: true,
				iconCls: 'fa fa-sign-in fa-lg',
				text: 'Submit',
				listeners: { click: 'onButtonClickSubmit' }
			}]
		}]
	}]
});