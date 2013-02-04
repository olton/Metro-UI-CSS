<?php include("header.php") ?>

    <div class="page secondary">

        <div class="page-header">
            <div class="page-header-content">
                <h1>Dialog box<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <button id="staticDialog">Static dialog</button>
                <button id="draggableDialog">Draggable dialog</button>
                <button id="positionedDialog">Positioned dialog</button>
                <script type="text/javascript" src="js/modern/dialog.js"></script>
                <script type="text/javascript">
                    $(document).ready(function(){
                        $('#staticDialog').click(function(e) {
                            $.Dialog({
                                'title'      : 'My static dialog',
                                'content'    : 'This content can be in HTML.<br />You can add custom function to your buttons!<br /><br /><b>Features:</b><ul><li>Easy to use!</li><li>Customizable</li><li>Powerful!</li></ul>',
                                'buttons'    : {
                                    'Ok'    : {
                                        'action': function(){}
                                    },
                                    'Cancel'     : {
                                        'action': function(){}
                                    }
                                }
                            });
                        });
                        $('#draggableDialog').click(function(e) {
                            $.Dialog({
                                'title'      : 'My draggable dialog',
                                'content'    : 'This content can be in HTML.<br />You can add custom function to your buttons!<br /><br /><b>Features:</b><ul><li>Easy to use!</li><li>Customizable</li><li>Powerful!</li></ul>',
                                'draggable'  : true,
                                'buttonsAlign': 'right',
                                'buttons'    : {
                                    'Ok'    : {
                                        'action': function(){}
                                    }
                                }
                            });
                        });
                        $('#positionedDialog').click(function(e) {
                            $.Dialog({
                                'title'      : 'My right dialog',
                                'content'    : 'This content can be in HTML.<br />You can add custom function to your buttons!<br /><br /><b>Features:</b><ul><li>Easy to use!</li><li>Customizable</li><li>Powerful!</li></ul>',
                                'draggable'  : true,
                                'closeButton': true,
                                'position'   : {
                                    'zone'   : 'right'
                                },
                                'buttons'    : {
                                    'Ok'    : {
                                        'action': function(){}
                                    },
                                    'Retry'     : {
                                        'action': function(){}
                                    },
                                    'Cancel'     : {
                                        'action': function(){}
                                    }
                                }
                            });
                        });
                    });
                </script>
                <h2>Component usage</h2>
                <p>You can have maximum one dialog box opened at once.</p>
<pre class="prettyprint linenums span10">
    $(document).ready(function(){
        $.Dialog({
            'title'       : 'My dialog title',
            'content'     : 'HTML content',
            'draggable'   : true,
            'overlay'     : true,
            'closeButton' : true,
            'buttonsAlign': 'right',
            'position'    : {
                'zone'    : 'right'
            },
            'buttons'     : {
                'button1'     : {
                    'action': function(){}
                },
                'button2'     : {
                    'action': function(){}
                }
            }
        });
    });
</pre>
                <h2>Params</h2>
                <ul class="unstyled">
                    <li><b>title</b> - Title of the dialog box (HTML format)</li>
                    <li><b>content</b> - Content of the dialog box (HTML format)</li>
                    <li><b>draggable</b> - Set draggable to dialog box, available: <i>true, false</i> (default: false)</li>
                    <li><b>overlay</b> - Set the overlay of the page (false will only remove the effect, not the div), available: <i>true, false</i> (default: true)</li>
                    <li><b>closeButton</b> - Enable or disable the close button, available: <i>true, false</i> (default: false)</li>
                    <li><b>buttonsAlign</b> - Align of the buttons, available: <i>left, center, right</i> (default: center)</li>
                    <li>
                    <b>buttons</b> - Set buttons in the action bar (JSON format)
                        <ul class="unstyled" style="margin-left: 20px;">
                        <li>
                            <b>name</b> - Text of the button (JSON format)
                            <ul class="unstyled" style="margin-left: 20px;">
                                <li><b>action</b> - Function to bind to the button</li>
                            </ul>
                        </ul>
                    </li>
                    <li>
                    <b>position</b> - Set the initial position of the dialog box (JSON format)
                        <ul class="unstyled" style="margin-left: 20px;">
                            <li><b>zone</b> - Zone of the dialog box, available: <i>left, center, right</i> (default: center)</li>
                            <li><b>offsetY</b> - Top offset pixels</li>
                            <li><b>offsetX</b> - Left offset pixels</li>
                        </ul>
                    </li>
                </ul>
                <h2>Javascript</h2>
                <p>Include in head <code>dialog.js</code></p>
            </div>
        </div>
    </div>

<? include("footer.php")?>
