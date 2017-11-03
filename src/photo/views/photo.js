import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../actions.js';
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
        var reader = new FileReader();
        reader.onload = (e) => {
            this.props.upload(e.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }
    onPick() {
        this.input.click();
    }
    render() {
        return (
            <div className="imgContent">
                <input type="file" className="hidden" accept="image/*" ref={this.refInput} onChange={this.upload} />
                <Img src={this.props.img} onPick={this.onPick}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownerProps) => {
    return {
        upload: (img) => dispatch(uploadPhoto(img))
    }
}

const mapStateToProps = (state) => {
    return {
        img: state.img
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);