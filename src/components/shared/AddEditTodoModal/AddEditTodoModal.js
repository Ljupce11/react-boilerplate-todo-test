import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

import { returnSubmitData } from '../../../helpers/returnSubmitData';
import { mockedApiCall } from '../../../services/services';

export default ({ showData, handleClose, todos, updateTodos }) => {
  const modalTitle = showData.todo ? 'Edit todo' : 'Add todo'
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const onChangeHandler = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    })
  }

  useEffect(async () => {
    if (showData.todo) {
      setIsLoadingData(true)
      const data = await mockedApiCall(showData.todo)
      if (data === 'OK') {
        setIsLoadingData(false)
        setFormData({
          title: showData.todo.title,
          description: showData.todo.description
        })
      }
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoadingSubmit(true)
    const todosCopy = await returnSubmitData(todos, showData, formData, () => setIsLoadingSubmit(false))
    updateTodos(todosCopy)
    handleClose()
  }

  return (
    <Modal show={showData.show} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmitHandler}>
        <Modal.Body>
          {
            isLoadingData ?
              <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
              :
              <>
                <Form.Group controlId="todoTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control required type="text" placeholder="Enter title" value={formData.title} onChange={(e) => onChangeHandler(e, 'title')} />
                </Form.Group>
                <Form.Group controlId="todoDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter description" value={formData.description} onChange={(e) => onChangeHandler(e, 'description')} />
                </Form.Group>
              </>
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button disabled={isLoadingData || isLoadingSubmit} type="submit" variant="primary">
            {
              isLoadingSubmit &&
              <Spinner
                as="span"
                size="sm"
                className="mr-2"
                animation="border"
              />
            }
            <span>Save Changes</span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}