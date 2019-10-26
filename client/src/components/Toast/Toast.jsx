import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class Toast extends Component {
    toastId = null;

    notify = () => this.toastId = toast("Hello", { autoClose: false });

    update = () => toast.update(this.toastId, { type: toast.TYPE.INFO, autoClose: 5000 });

    render() {
        return (
            <div>
                <button onClick={this.notify}>Notify</button>
                <button onClick={this.update}>Update</button>
            </div>
        )
    }
}