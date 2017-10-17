import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';



class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: [
        {
        name: "Chase",
        artist: "Bobby",
        album: "Yo Mamas",
        },
	      {
		      name: "Jamie",
		      artist: "Bobby",
		      album: "Yo Mamas",
	      },
	      {
		      name: "Todd",
		      artist: "Bobby",
		      album: "Yo Mamas",
	      }
      ],
	    playlistName: "Chase's List",
	    playlistTracks: [
		    {
		    	id: "Boo",
			    name: "Love",
			    artist: "Bobby",
			    album: "Yo Mamas",
		    },
		    {
		    	id: "You",
			    name: "Yourself",
			    artist: "Bobby",
			    album: "Yo Mamas",
		    },
		    {
		    	id: "Bo",
			    name: "Always",
			    artist: "Bobby",
			    album: "Yo Mamas",
		    }
	    ],

    };
    this.addTrack = this.addTrack.bind(this);
}


addTrack(track){
	let addTrackCheck = this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id === track.id);
	if (addTrackCheck.length === 0) {
			this.setState({playlistTracks: [...this.state.playlistTracks, track]});
			} else {console.log("Its already here")}
}



  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
