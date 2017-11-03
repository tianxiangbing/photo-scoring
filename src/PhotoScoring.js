import React from 'react';
import { view as Photo } from './photo/';
import { view as Scoring } from './scoring/';

function PhotoScoring() {
    return (
        <div >
        <h1>人要有自信</h1>
            <div className="bg" />
            <div className="content">
                <Photo />
                <Scoring />
            </div>
        </div>
    )
}

export default PhotoScoring