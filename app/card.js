import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import $ from 'jquery'

var MyList = React.createClass({
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
        return (
            <CardTitle
                style={this.state.readStyle}
                title={this.state.oneNews.title}
                onClick={this.handleClick}>
              {/*<CardText expandable={true} dangerouslySetInnerHTML={{__html:  this.state.oneNews.text}}>
              </CardText>*/}
            </CardTitle>
        );
    }
});

var MyCard = React.createClass({
    getInitialState: function(){
      return ({
          ids : []
      });
    },

    render: function() {
        return (
            <Card>
            {
                this.props.ids.map(function(a){
                    return (<MyList key={a} id={a} />);
                })
            }
            </Card>
        );
    }
});

module.exports = MyCard;
