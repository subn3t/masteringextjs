Ext.define('Packt.util.Util', {
	statics: {
		decodeJSON: function (text) {
			return Ext.decode(text, true) || {
				success: false,
				msg: text
			};
		},

		showErrorMsg: function (text) {
			Ext.Msg.show({
				title: 'Error!',
				msg: text,
				icon: Ext.Msg.ERROR,
				button: Ext.Msg.OK
			});
		}
	}
})