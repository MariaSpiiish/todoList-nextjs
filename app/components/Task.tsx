'use client'

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(task.text)

  const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskValue
    })
    setEditModalOpen(false);
    router.refresh();
  }

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    router.refresh();
  }

  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit onClick={() => setEditModalOpen(true)} cursor='pointer' className="text-blue-500" size={25}/>

          <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
            <form onSubmit={handleEditTodo}>
              <h3 className="font-bold text-lg">Add new task</h3>
              <div className="modal-action">
                <input
                  value={taskValue}
                  type="text"
                  onChange={(e) => setTaskValue(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">Submit</button>
              </div>
            </form>
          </Modal>

          <FiTrash2 onClick={() => setDeleteModalOpen(true)} cursor='pointer' className="text-red-500" size={25}/>

          <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
            <div className="flex flex-col gap-5 items-center">
              <h3 className="font-bold text-lg">Are you sure you want to delete this task?</h3>
              <button className="btn w-1/3" onClick={() => handleDeleteTodo(task.id)}>Yes</button>
            </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task;