/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
	];

	//config.removeButtons = 'Save,Source,NewPage,ExportPdf,Preview,Image,Flash,Templates,Print,Cut,PasteText,PasteFromWord,Find,Replace,SelectAll,Form,Checkbox,TextField,Textarea,Select,Button,imagebutton,HiddenField,Subscript,Superscript,CopyFormatting,RemoveFormat,BulletedList,NumberedList,Outdent,Indent,CreateDiv,Blockquote,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiRtl,BidiLtr,Anchor,image,Table,HorizontalRule,SpecialChar,PageBreak,Iframe,Maximize,About,ShowBlocks,Undo,Redo,Format,Styles,Paste,Copy';
	config.extraPlugins = 'editorplaceholder,emoji,font';
	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	config.removePlugins = 'elementspath,chat-gpt';
	config.resize_enabled = false;

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
