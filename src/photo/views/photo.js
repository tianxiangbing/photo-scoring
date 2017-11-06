import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../actions.js';
import { actions } from '../../scoring';
import Img from './img.js';
import './style.css';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.upload = this.upload.bind(this);
        this.refInput = this.refInput.bind(this);
        this.onPick = this.onPick.bind(this);
    }
    refInput(node) {
        this.input = node;
    }
    upload(e) {
        let reader = new FileReader();
        let _this = this;
        reader.onload = (e) => {
            // this.props.upload(e.target.result)
            let img= new Image();
            img.onload = function(){
                let canvas = document.createElement("canvas");  
                let ctx = canvas.getContext("2d");  
                canvas.width = 200;  
                canvas.height = 200;  
                ctx.drawImage(this, 0, 0, 200, 200); 
                let base64 = canvas.toDataURL("image/png");
                _this.props.upload(base64);
            }
            img.src = e.target.result;
        }
        if (e.target.files.length) {
            reader.readAsDataURL(e.target.files[0])
            this.props.clearShot();
        }
    }
    onPick() {
        this.input.click();
    }
    render() {
        return (
            <div className="imgContent">
                <input type="file" className="hidden" accept="image/*" ref={this.refInput} onChange={this.upload} />
                <Img src={this.props.img} onPick={this.onPick} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownerProps) => {
    return {
        upload: (img) => dispatch(uploadPhoto(img)),
        clearShot: () => dispatch(actions.screenshot())
    }
}

const mapStateToProps = (state) => {
    return {
        img: state.img
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);