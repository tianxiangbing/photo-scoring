import React from 'react';
import { view as Photo } from './photo/';
import { view as Scoring } from './scoring/';


const PhotoScoring = () => {
    return (
        <div>
            <div>
                <h1>人要有自信</h1>
                <div className="bg" />
                <div className="content">
                    <Photo />
                    <div onTouchStart={this.onClick} >
                        <Scoring />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PhotoScoring;