import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

import { mockedApiCall } from '../../../services/services';

export const DeleteTodoModal = ({ show, handleClose, todos, updateTodos }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteTodoHandler = async () => {
    setIsLoading(true)
    if (show.todo) {
      const data = await mockedApiCall()
      if (data === 'OK') {
        const todosCopy = [...todos]
        const activeTodoIndex = todosCopy.indexOf(todosCopy.find(todo => todo.id === show.todo.id))
        todosCopy.splice(activeTodoIndex, 1)
        updateTodos(todosCopy)
        handleClose()
      }
    }
  }

  return (
    <Modal show={show.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete todo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you would like to delete this todo?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button disabled={isLoading} type="submit" variant="danger" onClick={onDeleteTodoHandler}>
          {
            isLoading &&
            <Spinner
              as="span"
              size="sm"
              className="mr-2"
              animation="border"
            />
          }
          <span>Delete</span>
        </Button>
      </Modal.Footer>
    </Modal>
  )
}