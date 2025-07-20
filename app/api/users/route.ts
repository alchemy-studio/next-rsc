import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { userSchema } from '@/lib/schemas';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb"); // You can name your database whatever you like

    const users = await db
      .collection("users")
      .find({})
      .limit(10)
      .toArray();

    return NextResponse.json(users);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const body = await request.json();

    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email } = validation.data;

    const result = await db.collection("users").insertOne({ name, email });

    return NextResponse.json({ message: "User created", userId: result.insertedId }, { status: 201 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
