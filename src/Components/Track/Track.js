import React from 'react';
import './Track.css';

class Track extends React.Component{

	this.props.onAdd(this.props.track);

	renderAction() {
		if(this.props.isRemoval) {
			return <a className="Track-action">+</a>;
		} else {
			return <a className="Track-action">-</a>;
		}
	}

	render() {
		return(
			<div className="Track">
			  <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.album} | {this.props.track.artist}</p>
			  </div>
				{this.renderAction()}
			</div>
		);
	}
}

export default Track;