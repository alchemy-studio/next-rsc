import UserForm from './_components/UserForm';
import clientPromise from '@/lib/mongodb';
import { User } from '@/lib/schemas';

// Add _id to the User type for the frontend
type UserWithId = User & { _id: string };

async function getUsers(): Promise<UserWithId[]> {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const users = await db
      .collection("users")
      .find({})
      .limit(10)
      .toArray();
    // Convert ObjectId to string for serialization
    return JSON.parse(JSON.stringify(users));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>MongoDB User Management</h1>
      
      <UserForm />

      <hr style={{ margin: '2rem 0' }} />

      <h2>Current Users in DB</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found. Add one above!</p>
      )}
    </main>
  );
}
