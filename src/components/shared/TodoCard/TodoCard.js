import React from 'react';
import { Trash2 } from 'react-feather';

export default ({ setShowAddEditModal, todo, showDeleteModalHandler, onChangeHandler }) => {
  return (
    <div onClick={() => setShowAddEditModal(true, todo)} className={`todo d-flex justify-content-between align-items-center my-4 py-3 px-4 ${todo.checked && 'checked'}`}>
      <div className="d-flex align-items-center ">
        <div>
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.checked}
            onClick={(e) => { e.stopPropagation() }}
            onChange={(e) => onChangeHandler(e, todo.id)} />
        </div>
        <div className="px-4">
          <h4 className="m-0">
            {todo.checked ? <s>{todo.title}</s> : todo.title}
          </h4>
          <p className="m-0 mt-1 text-muted">
            {todo.checked ? <s>{todo.description}</s> : todo.description}
          </p>
        </div>
      </div>
      <div>
        <Trash2 onClick={(e) => showDeleteModalHandler(e, true, todo)} color="red" size={25} />
      </div>
    </div>
  )
}