import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Footer.css';

class Footer extends Component {

    render() {
        return (
            <footer className={ classes.Footer }>
                <div className="container">
                    <div className={ classes.grid }>
                        <div className={ classes.lrg }>
                            <h4 style={{padding: '0.35em', color: '#e09e73'}}>{ this.props.site.name }</h4>
                        </div>
                        <div className={ classes.sm }>
                            
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return {
        pages: state.sites.pages,
        site: state.sites.site
    };
};

export default connect(mapStateToProps)(Footer);