import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Playground, Props } from 'docz';
type IProps = {
    of: any
};
type IState = {

};
export default class YProps extends React.Component<IProps, IState> {
    private el: any;
    constructor(props:IProps) {
        super(props);
    }

    render() {
        console.log('elele', this.el)
        return (
            <div ref={(el: any)=>this.el =el}>
                <Props of={this.props.of}  />
            </div>
        );
    }
}
