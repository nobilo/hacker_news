import React, { Component } from 'react';
import PropTypes from 'prop-types';
import javascriptTimeAgo from 'javascript-time-ago';
import './Story.css';

javascriptTimeAgo.locale(require('javascript-time-ago/locales/en'));
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')
const timeAgoEnglish = new javascriptTimeAgo('en-US')

class Story extends Component {
  render() {
    /*time is UNIX timestamp*/
    let commentsURI = 'https://news.ycombinator.com';
    let filterBySiteURI = 'https://news.ycombinator.com/from?site=';
    let prefix, pssedTime, comments = '', commentsLink= '', source = {};
    if (this.props.story) {
      pssedTime = timeAgoEnglish.format(this.props.story.time * 1000);
      comments = '';
      if (this.props.story.descendants > 0) {
        prefix = '|';
        comments = this.props.story.descendants + 'comments';
      }
      if (this.props.story.url) {
        source = new URL(this.props.story.url)
      }
      commentsLink = commentsURI + '/item?id=' + this.props.story.id;
    };
    return (
      <li className='Story list-group-item'>
        <p className='Story-title'>
          <span className='Number'>
            {this.props.story.index}.
          </span>
          <a href={source.href}>{this.props.story.title}</a>
          &nbsp; (
           <a className='Story-domen' href={filterBySiteURI + source.hostname}>
           {source.hostname}
           </a>
         ) 
        </p>
        <p className='Story-details'>
          <b>{this.props.story.score}</b> points by 
          &nbsp;	
          <b>{this.props.story.by}</b> &nbsp;	
          {pssedTime} &nbsp;	
          {prefix}&nbsp;	
          <b><a href={commentsLink}>{comments}</a></b>
        </p>
      </li>
    );
  }
};

Story.propTypes = {
  story: PropTypes.object
};

export default Story;
