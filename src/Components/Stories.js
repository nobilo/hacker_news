import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

class Stories extends Component {
  render() {
    let stories;
    if(this.props.stories) {
        stories = this.props.stories.slice();
        /* Sort list of stories by index property.
        On this way we keep stories ordered by popularity
        */
        stories.sort((a,b) => a.index - b.index);
        stories = stories.map(story => <Story key={story.id} story={story} />)
    }
    return (
    <ol className='App-intro list-group'>
        {stories}
    </ol>
    );
  }
}

Stories.propTypes = {
    stories: PropTypes.array
};

export default Stories;
