Kwf.Form.HtmlEditor.PastePlain = Ext.extend(Ext.util.Observable, {
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.afterMethod('createToolbar', this.afterCreateToolbar, this);
    },

    // private
    afterCreateToolbar: function() {
        var tb = this.cmp.getToolbar();
        tb.insert(10, {
            icon: '/assets/kwf/images/pastePlain.gif',
            handler: this.onPastePlain,
            scope: this,
            tooltip: {
                cls: 'x-html-editor-tip',
                title: trlKwf('Insert Plain Text'),
                text: trlKwf('Insert text without formating.')
            },
            cls: 'x-btn-icon',
            clickEvent: 'mousedown',
            tabIndex: -1

        });
        tb.insert(11, '-');
    },

    onPastePlain: function() {
        var bookmark = this.cmp.tinymceEditor.selection.getBookmark();
        Ext.Msg.show({
            title : trlKwf('Insert Plain Text'),
            msg : '',
            buttons: Ext.Msg.OKCANCEL,
            fn: function(btn, text) {
                if (btn == 'ok') {
                    this.cmp.tinymceEditor.selection.moveToBookmark(bookmark);
                    text = text.replace(/\r/g, '');
                    text = text.replace(/\n/g, '</p>\n<p>');
                    text = String.format('<p>{0}</p>', text);
                    this.cmp.insertAtCursor(text);
                }
            },
            scope : this,
            minWidth: 500,
            prompt: true,
            multiline: 300
        });
    }
});