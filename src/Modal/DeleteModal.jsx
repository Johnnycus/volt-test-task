import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class DeleteModal extends Component {
  deleteItem() {
    fetch(`/api/${this.props.page}/${this.props.selected}`, {
      method: 'DELETE'
    })

    // Can't make it work in a way that after delete - new state shows up (without deleted item), so just page reload here
    window.location.reload();
  }

  render() {
    const { page, selected, showModal, closeModal } = this.props;

    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {page.slice(0, -1)} #{selected}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: 'center', fontSize: '24px' }}>
          Are you sure?
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.deleteItem.bind(this)}>Delete</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}