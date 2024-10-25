import { hc } from 'hono/client'
import { useCallback, useEffect, useState } from "react"
import { createRoot } from 'react-dom/client'
import type { AppType } from "./index"

type User = {
  id: number
  name: string
  age: number
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useCallback(async () => {
    const client = hc<AppType>('/')
    const response = await client.api.users.$get()
    const data = await response.json()
    setUsers(data)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleClick = async () => {
    const client = hc<AppType>('/')

    const userCount = users.length
    await client.api.users.$post({
      json: {
        name: `User ${userCount}`,
        age: userCount,
        email: `${userCount}@example.com`,
      },
    })
    await fetchUsers()
  }

  return (
    <>
      <button type='button' onClick={handleClick}>
        Add user
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <ul>
              <li>Age: {user.age}</li>
              <li>Email: {user.email}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

// biome-ignore lint:
const domNode = document.getElementById('root')!
const root = createRoot(domNode)
root.render(<App />)
