import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'; 
import Modal from '../Modal'
import history from '../../history'
import StreamList from './StreamList';
import {fetchStream} from '../../actions'; 
import {deleteStream} from '../../actions';
import Header from '../Header';

class StreamDelete extends React.Component {

    componentDidMount() {
       this.props.fetchStream(this.props.match.params.id)
    }
   onClick = () => {
       this.props.deleteStream(this.props.match.params.id)

   }

   renderActions() {
    return (
        <React.Fragment>
            <button onClick={this.onClick} className="ui button negative">Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    )
   }

   renderContent() {
       if (!this.props.stream) {
           return (
               <React.Fragment>
                   <span className="ui active inline loader"></span>
               </React.Fragment>
           )
       } else {
           return `Are you sure you want to delete the stream: ${this.props.stream.title}`
       }
   }


    render() {
        return (
            <div>
                <Header />
                <StreamList />
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>

        )
    };
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]  }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete); 