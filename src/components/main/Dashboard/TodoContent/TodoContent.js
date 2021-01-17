import React from 'react';
import { Plus } from 'react-feather';

import TodoCard from '../../../shared/TodoCard/TodoCard';

export default ({ todos, onChangeHandler, setShowAddEditModal, showDeleteModalHandler }) => {
  return (
    <div className="col-md-6">
      <h3 className="text-center">In progress</h3>
      {
        todos.filter(todo => !todo.checked).length > 0 ?
          todos.filter(todo => !todo.checked).map((todo, key) => (
            <React.Fragment key={key}>
              <TodoCard
                todo={todo}
                onChangeHandler={onChangeHandler}
                setShowAddEditModal={(showValue, todoValue) => setShowAddEditModal(showValue, todoValue)}
                showDeleteModalHandler={showDeleteModalHandler} />
            </React.Fragment>
          ))
          :
          <p className="text-center text-muted mt-4">The list is empty</p>
      }
      <div className="d-flex justify-content-center">
        <button title="Add" onClick={() => setShowAddEditModal(true, null)} className="btn btn-outline-primary p-2 add-todo">
          <Plus size={40} />
        </button>
      </div>
    </div>
  )
}