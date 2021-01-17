import React, { useEffect, useState } from 'react';

import mockData from '../../../mockData/mockData.json';
import TodoContent from './TodoContent/TodoContent';
import DoneContent from './DoneContent/DoneContent';
import AddEditTodoModal from '../../shared/AddEditTodoModal/AddEditTodoModal';
import { DeleteTodoModal } from '../../shared/DeleteTodoModal/DeleteTodoModal';
import { mockedApiCall } from '../../../services/services';
import { Spinner } from 'react-bootstrap';

export const Dashboard = () => {
  const [todos, setTodos] = useState(null)
  const [showAddEditModal, setShowAddEditModal] = useState({ show: false, todo: null })
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, todo: null })

  useEffect(async () => {
    const data = await mockedApiCall()
    if (data === 'OK') {
      setTodos(mockData)
    }
  }, [])

  const onChangeHandler = (e, id) => {
    const todosCopy = [...todos]
    const activeTodo = todosCopy.find(todo => todo.id === id)
    activeTodo.checked = e.target.checked
    setTodos(todosCopy)
  }

  const showDeleteModalHandler = (e, showValue, todoValue) => {
    e.stopPropagation()
    setShowDeleteModal({ show: showValue, todo: todoValue })
  }

  return (
    <React.Fragment>
      {
        showAddEditModal.show &&
        <AddEditTodoModal
          showData={showAddEditModal}
          todos={todos}
          updateTodos={(data) => setTodos(data)}
          handleClose={() => setShowAddEditModal({ show: false, todo: null })} />
      }
      {
        showDeleteModal.show &&
        <DeleteTodoModal
          show={showDeleteModal}
          todos={todos}
          updateTodos={(data) => setTodos(data)}
          handleClose={() => setShowDeleteModal({ show: false, todo: null })} />
      }
      <h1 className="my-5 text-center">Digital Present Todo App</h1>
      <div className="container">
        <div className="row">
          {
            todos ?
              <>
                <TodoContent
                  todos={todos}
                  onChangeHandler={onChangeHandler}
                  showDeleteModalHandler={showDeleteModalHandler}
                  setShowAddEditModal={(showValue, todoValue) => setShowAddEditModal({ show: showValue, todo: todoValue })} />
                <DoneContent
                  todos={todos}
                  onChangeHandler={onChangeHandler}
                  showDeleteModalHandler={showDeleteModalHandler}
                  setShowAddEditModal={(showValue, todoValue) => setShowAddEditModal({ show: showValue, todo: todoValue })} />
              </>
              :
              <div className="d-flex flex-grow-1 justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
          }
        </div>
      </div>
    </React.Fragment>
  )
}