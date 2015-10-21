Ext.define('Packt.util.Util', {

	statics: {

		required: '<span style="color:red;font-weight:bold" data-qtip="Required"> *</span>',

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
		},

    showToast: function (text) {
      Ext.toast({
        html: text,
        closable: false,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
      });
    },

    handleFormFailure: function (action) {
      var result = Packt.util.Util.decodeJSON(action.response.responseText);

      switch (action.failureType) {
        case Ext.form.action.Action.CLIENT_INVALID:
          this.showErrorMsg('Form fields may not be submitted with invalid values');
          break;
        case Ext.form.action.Action.CONNECT_FAILURE:
          this.showErrorMsg(action.response.responseText);
          break;
        case Ext.form.action.Action.SERVER_INVALID:
          this.showErrorMsg(result.msg);
      }
    }

	}

});