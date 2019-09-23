import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '561287026716-tab9a2pa96s69uj7c0qjt10or4ll3k71.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });

    };

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
        

    };

    onSignOutClick = () => {
        this.auth.signOut();
        alert('You are signed out!')

    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In With Google
                </button>
            )
        }
    };


    render() {
        return (
            <React.Fragment>
                {this.renderAuthButton()}
            </React.Fragment>

        )
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }

}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth); 
