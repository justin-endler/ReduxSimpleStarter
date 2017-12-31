import React , { Component } from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import ytApiKey from './config.js';

const DEFAULT_TERM = 'zappa';
const DEBOUNCE_INTERVAL = 300;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch(DEFAULT_TERM);
  }

  videoSearch(term) {
    YTSearch({
      key: ytApiKey,
      term
    }, videos => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // reduce the frequency of the search call
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, DEBOUNCE_INTERVAL);

    return (
      <div>
        <SearchBar onSearchTermChange={term => videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));