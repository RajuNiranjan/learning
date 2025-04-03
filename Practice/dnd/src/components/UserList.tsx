import React, { useState } from 'react'
import { UserItem } from './UserItem';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';


export type User = {
    id: number;
    name: string;
    eamil:string
  }
  
  const data: User[] = [
    {
      id: 1,
      name: 'Alice Smith',
      eamil: 'alice@example.com'
    },
    {
      id: 2,
      name: 'Bob Johnson',
      eamil: 'bob@example.com'
    },
    {
      id: 3,
      name: 'Carol Williams',
      eamil: 'carol@example.com'
    },
    {
      id: 4,
      name: 'David Brown',
      eamil: 'david@example.com'
    },
  ]
  

export const UserList = () => {
    const [userData, setUserData] = useState<User[]>(data)

const handleDragEnds = (e: DragEndEvent)=>{
    const {active, over} = e
  if(over && active.id !== over.id){
    setUserData(items => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
    return arrayMove(items, oldIndex, newIndex)
    })
  }
}

console.log("userData", userData);



  return (
    
    <div className='min-w-2xl mx-auto grid gap-2 my-10'>
      <h2 className="text-2xl font-bold-mb-4">User List</h2>
      <DndContext modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnds}
      >
        <SortableContext items={userData}>   
          <div className='grid gap-2'>
            {userData.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
