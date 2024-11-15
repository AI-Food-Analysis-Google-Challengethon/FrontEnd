import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const authorization = request.headers.get('authorization');
    
    // Extract image and request data
    const image = formData.get('image');
    const requestJSON = formData.get('request');
    
    if (!image || !requestJSON) {
      return NextResponse.json(
        { message: '이미지와 요청 데이터가 필요합니다.' },
        { status: 400 }
      );
    }

    // Create new FormData for the backend
    const backendFormData = new FormData();
    backendFormData.append('image', image);
    backendFormData.append('type', JSON.parse(requestJSON as string).type);
    backendFormData.append('date', JSON.parse(requestJSON as string).date);

    const response = await axios.post('https://foodeat.o-r.kr/diets', backendFormData, {
      headers: {
        'Authorization': authorization,
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
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