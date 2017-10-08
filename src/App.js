import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import Stories from './Components/Stories';

const endpointURI = 'https://hacker-news.firebaseio.com/v0/';
const StoriesPerPage = 20;
class App extends Component {
  constructor() {    
    super();
    this.state = {
      top500Stories: [], // id of top 500 stories
      stories: [],
      displayedStories: [],
      page: 0,
    }
  }

  getDetailsOfNextNTopStories(N) {
    for(let i = 0; i < N; i++){
      $.ajax({
        url: endpointURI + 'item/' + this.state.top500Stories[this.state.stories.length + i] + '.json',
        dataType:'json',
        cache: false,
        success: (data) => {
          let stories = this.state.stories.slice();
          data.index = this.state.page * StoriesPerPage + i + 1;          
          stories.push(data);          
          /* 
          keep index of story so it can be ordered
          by popularity
          */
          let displayed;
          if (stories.length >= StoriesPerPage){
             displayed = stories.slice(
            this.state.page * StoriesPerPage,
            (this.state.page + 1 ) * StoriesPerPage);
          } else {
            displayed = stories;
          }
          this.setState({
            stories: stories,
            displayedStories: displayed,
          });
        },
        error: (xhr, status, err) => {
          console.log(err);
        }
      });
    }
  }
  
  updateStories() {
    let top500Stories = [];
    $.ajax({
      url: endpointURI + 'topstories.json',
      dataType:'json',
      cache: false,
      success: (data) => {
        top500Stories = data;
        this.setState({
          top500Stories: top500Stories,
          stories: [],
        });
        // update currently fetched details of stories 
        for(let i = 0; i <= this.state.page; i++) {
          this.getDetailsOfNextNTopStories(StoriesPerPage);
        }
      },
      error: (xhr, status, err) => {
        console.log(err);
      }
    });
  }
  
  componentWillMount() {
    this.updateStories();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateStories(),
      30000
    );
  }

  showPrev() {
    let page;
    if(this.state.page > 0) {
      page = this.state.page - 1;
    } else {
      page = this.state.page;
    }
    //Update list of displayed stories 
    let displayed = this.state.stories.slice(page * StoriesPerPage,
      (page+1) * StoriesPerPage);
    this.setState({
      page: page,
      displayedStories: displayed,
    }); 
  }

  showMore() {
    this.getDetailsOfNextNTopStories(StoriesPerPage);     
    let page = this.state.page + 1;
    //Update list of displayed stories
    this.setState({
      page:page
    }); 
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='App-title'>
            <strong>HackerNews</strong>
            <span onClick={() => this.updateStories()}><i className='fa fa-refresh' aria-hidden='true'></i>
            </span>
           </div>
        </header>
        <div className='container'>
          <Stories class='Stories' stories={this.state.displayedStories}/>
        </div>
        <div className="Navigation">
          <span onClick={()=> this.showPrev()}>Prev </span> &nbsp;	
          | &nbsp;	
          <span onClick={()=> this.showMore()}>More</span>
        </div>
      </div>
    );
  }
}

export default App;
