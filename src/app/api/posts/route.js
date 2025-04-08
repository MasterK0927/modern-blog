import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const cat = searchParams.get('cat');
  const sort = searchParams.get('sort') || 'recent';
  const POST_PER_PAGE = 2;

  console.error('GET request received', {
    page,
    cat,
    sort,
  });

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: sort === 'recent' ? 'desc' : 'asc',
    },
  };

  try {
    await prisma.$connect();
    console.log('Connected to the database');
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.error('Database Error:', {
      message: err.message,
      query: query,
      stack: err.stack
    });
    return new NextResponse(
      JSON.stringify({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
      }), 
      { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'Not Authenticated!' }), 
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }), 
      { status: 500 }
    );
  }
};
