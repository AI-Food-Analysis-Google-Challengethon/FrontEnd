import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const authorization = request.headers.get('authorization');
    
    if (!authorization) {
      return NextResponse.json(
        { message: '인증 토큰이 없습니다.' },
        { status: 401 }
      );
    }

    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json(
        { message: '이미지가 필요합니다.' },
        { status: 400 }
      );
    }

    const imageFormData = new FormData();
    imageFormData.append('image', image);

    const response = await axios.post('https://foodeat.o-r.kr/storage/images', imageFormData, {
      headers: {
        'Authorization': authorization,
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return NextResponse.json(
          { message: '인증이 만료되었습니다.' },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { message: error.response?.data?.message || '서버 에러가 발생했습니다.' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}