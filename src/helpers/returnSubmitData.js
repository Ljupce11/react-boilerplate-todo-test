import { v4 as uuid } from 'uuid';
import { mockedApiCall } from "../services/services"

export const returnSubmitData = async (todos, showData, formData, updateLoadingSubmit) => {
  const todosCopy = [...todos]
  if (showData.todo) {
    const data = await mockedApiCall()
    if (data === 'OK') {
      const activeTodo = todosCopy.find(todo => todo.id === showData.todo.id)
      activeTodo.title = formData.title
      activeTodo.description = formData.description
      updateLoadingSubmit()
      return todosCopy
    }
  } else {
    const data = await mockedApiCall()
    if (data === 'OK') {
      todosCopy.push({
        id: uuid(),
        checked: false,
        title: formData.title,
        description: formData.description
      })
      updateLoadingSubmit()
      return todosCopy
    }
  }
}