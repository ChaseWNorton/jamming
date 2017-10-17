this.setState({ playlistTracks: newPlaylist })
this.setState({ playlistTracks: this.state.playlistTracks.push(track) })

let arr1 = [10, 20];
let arr2 = [...arr1, 30];

console.log(arr2); // [10, 20, 30]
let currTracks = this.state.playlistTracks;
let newTracks = [...currTracks, track];

this.setState({ playlistTracks: newTracks });