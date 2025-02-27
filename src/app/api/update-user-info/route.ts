import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { kickUsername, streamKey } = await request.json();
    
   
    await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        kickUsername,
        streamKey,
        isNewUser: false,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user info:', error);
    return NextResponse.json({ error: 'Failed to update user info' }, { status: 500 });
  }
}