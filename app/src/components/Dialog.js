import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import UploadPicture from './UploadPicture';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class CustomDialog extends Component {

  state = {
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    this.setState({ open: status === 'open' });
  }

  handleClose = () => { this.setState({ open: false }); };

  render() {
    const { preview } = this.props.file;
    const { error } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!preview}
        onClick={this.props.handleSubmit}
      />,
    ];
    if (this.props.status === 'loading') return <CircularProgress />;
    return (
      <div>
        <Dialog
          actions={actions}
          modal
          open={this.state.open}
        >
          <UploadPicture
            file={this.props.file}
            handleUpload={this.props.handleUpload}
          />
          <p style={{ color: 'red' }}>{error}</p>
        </Dialog>
      </div>
    );
  }
}
