import React from 'react';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';

import $ from 'jquery'


function prettyDate(time){
	var date = new Date(time*1000),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;

	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

var Article = React.createClass({
    getInitialState: function() {
        return {
            oneNews :  {}
        };
    },
    componentDidMount: function() {
        $.get("https://hacker-news.firebaseio.com/v0/item/"+this.props.id+".json", function(result) {
            if (this.isMounted()) {
                this.setState({"oneNews" : result});
            }
        }.bind(this));
    },
    handleClick: function(event) {
      window.open(this.state.oneNews.url);
      this.setState({
        "readStyle" : {
          backgroundColor : "grey"
        }
      });
    },
    render: function() {
        var news = this.state.oneNews;
        var subtitleStr = "score: " + news.score + " | ";
        subtitleStr += "by " + news.by + " " + prettyDate(news.time) + "  | ";
        subtitleStr += news.descendants + " comments";
        return (
            <ListItem
                style={this.state.readStyle}
                primaryText={news.title}
                secondaryText={subtitleStr}
                onClick={this.handleClick}>
            </ListItem>
        );
    }
});

var MyList = React.createClass({
    getInitialState: function(){
      return ({
          ids : []
      });
    },

    render: function() {
        return (
            <List>
            {
                this.props.ids.map(function(a){
                    return (<Article key={a} id={a} />);
                })
            }
            </List>
        );
    }
});

module.exports = MyList;
