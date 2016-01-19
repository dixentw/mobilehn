/* main.js */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import Toggle from 'material-ui/lib/toggle';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();

import MyCard from './card';
import $ from 'jquery';

var Main = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getInitialState: function() {
        return {
            ids :  [],
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },
    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });
        this.setState({muiTheme: newMuiTheme});
    },

    componentDidMount: function() {
        $.get("https://hacker-news.firebaseio.com/v0/newstories.json", function(result) {
            if (this.isMounted()) {
                var o = result.slice(0, 100);
                this.setState({"ids" : o});
            }
        }.bind(this));
    },

    onToggle : function(e, isToggle){
        if(isToggle){ //hottest
            $.get("https://hacker-news.firebaseio.com/v0/topstories.json", function(result) {
                this.setState({"ids" : result.slice(0, 100)});
            }.bind(this));
        }else{
            $.get("https://hacker-news.firebaseio.com/v0/newstories.json", function(result) {
                var o = result.slice(0, 100);
                this.setState({"ids" : o});
            }.bind(this));
        }
    },
    render: function() {
        return (
            <div>
                <AppBar
                    title="HackerNews"
                    showMenuIconButton = {false}
                    iconElementRight={
                        <Toggle
                            name="toggleName2"
                            value="toggleValue2"
                            label="latest/hottest"
                            style={{trackWhenSwitched : {backgroundColor:"red"}}}
                            onToggle={this.onToggle}
                        />
                    }
                />
                <MyCard ids={this.state.ids} />
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('main'));
