import React, { Component } from 'react';
import { view as Photo } from './photo/';
import { view as Scoring } from './scoring/';
import html2canvas from 'html2canvas';
import { connect } from 'react-redux';

class PhotoScoring extends Component {
    constructor(props) {
        super(props);
        this.state = { img: null };
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let _this = this;
        html2canvas(document.getElementById('root'), {
            onrendered: (canvas) => {
                let url = canvas.toDataURL();
                _this.setState({ img: url });
            }
        });
    }
    render() {
        return (
            <div>
                {this.state.img ? <img className="downImg" src={this.state.img} alt="长按下载" /> : undefined}
                <div>
                    <h1>人要有自信</h1>
                    <div className="bg" />
                    <div className="content">
                        <Photo />
                        <div onTouchStart={this.onClick} >
                            {this.state.img ? undefined : <Scoring />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PhotoScoring;