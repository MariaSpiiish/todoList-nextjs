'use client'

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState, FormEventHandler } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setModalOpen(false);
    setNewTaskValue('');
    router.refresh();
  }

  return (
    <div>
        <button className="btn btn-primary w-full" onClick={() => setModalOpen(true)}>
          Add new task<AiOutlinePlus className="ml-2" size={18}/>
        </button>

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className="font-bold text-lg">Add new task</h3>
            <div className="modal-action">
              <input
                value={newTaskValue}
                type="text"
                onChange={(e) => setNewTaskValue(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}

export default AddTask