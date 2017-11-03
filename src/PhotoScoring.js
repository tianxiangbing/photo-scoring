import React from 'react';
import { view as Photo } from './photo/';
import { view as Scoring } from './scoring/';

function PhotoScoring() {
    return (
        <div >
            <div className="bg" />
            <div className="content">
                <Photo />
                <Scoring />
            </div>
        </div>
    )
}

export default PhotoScoring