const clientId = "5fc64ff558c5439aa373ccf7775a3972";
const redirectUri = "http://chase.surge.sh";
let accessToken;



const Spotify = {


	getAccessToken() {

		if (accessToken) {return new Promise(resolve => resolve(accessToken));}
			else if(window.location.href.match(/access_token=([^&]*)/)) {
					const tokenArray = window.location.href.match(/access_token=([^&]*)/);
					const expirationTime = window.location.href.match(/expires_in=([^&]*)/);
					const expireNumber = Number(expirationTime[1]);
								accessToken = tokenArray[1];
								window.setTimeout(() => accessToken = '', expireNumber * 1000 );
								window.history.pushState('Access Token', null, '/');
								return new Promise(resolve => resolve(accessToken));}
					else {
						return new Promise(resolve => resolve(window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`))}
	},

	search(term) {
		return Spotify.getAccessToken()
				.then(() => {
					return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}})})
							.then(response => response.json())
							.then(jsonResponse => {
									if (!jsonResponse.tracks) {return [];}
									else {
										return jsonResponse.tracks.items.map(track => {
											return {
												id: track.id,
												name: track.name,
												artist: track.artists[0].name,
												album: track.album.name,
												uri: track.uri,
											}})}})
	},

	savePlaylist(playlist, arrayOfUri) {

		if (!playlist || !arrayOfUri) {return null}
		let userId = '';
		let playlistID = '';
		// let headers = ;
		return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${accessToken}`}})
				.then(response => response.json())
				.then(jsonResponse => {
						if(!jsonResponse.id) {alert("You are not logged in. Please log into Spotify first so we know who you are.");}
						else {return userId = jsonResponse.id;}})

				.then(() => {return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, {
					method: 'POST',
					headers: {Authorization: `Bearer ${accessToken}`, 'Content-type': 'application/json'},
					body: JSON.stringify({name: playlist})})})

				.then(response => response.json())
				.then(jsonResponse => {
					if (!jsonResponse.id) { alert("You have not saved it yet. Please try again")}

					else {return playlistID = jsonResponse.id}})
				.then(() => {return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
					headers:{Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
					method: 'POST',
					body: JSON.stringify({uris: arrayOfUri})})})
				.then(response => response.json())
				.then(jsonResponse => {
					if (!jsonResponse) {return alert("We did not detect any tracks in your list. Add some and try again")}
					else {return alert(`Playlist ${playlist} saved to your Spotify account. Go enjoy:-)`)}})
	}
};

export default Spotify;
