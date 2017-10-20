import React from 'react';
import './Track.css';

class Track extends React.Component{
	constructor(props){
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);

	}


	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	renderAction() {
		if(!this.props.onRemove) {
			return (

						<a className="Track-action" onClick={this.addTrack}><i className="fa fa-plus" aria-hidden="true"></i><p id="Add">Add</p></a>
					);
		} else {
			return <a className="Track-action" onClick={this.removeTrack}>-</a>;
		}
	}


	render() {
		return(
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.album} | {this.props.track.artist}</p>
			  </div>
				{this.props.preview ? <audio src={this.props.preview} controls ></audio> : <p id="Sorry">Sorry, No Preview</p>}
				{this.renderAction()}
			</div>
		);
	}
}

export default Track;

