import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const authorization = request.headers.get('authorization');

    console.log('Received data:', data);
    console.log('Authorization:', authorization);

    if (!data.nickname || !data.height || !data.weight || !data.age || !data.gender || !data.schoolName || !data.schoolCode) {
      return NextResponse.json(
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const response = await axios.post(
      'https://foodeat.o-r.kr/members/sign-up',
      {
        nickname: data.nickname,
        height: Number(data.height),
        weight: Number(data.weight),
        age: Number(data.age),
        gender: data.gender,
        schoolName: data.schoolName,
        schoolCode: data.schoolCode
      },
      {
        headers: {
          'Authorization': authorization
        }
      }
    );

    // 응답 데이터 자세히 로깅
    console.log('Full response:', response);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    // Postman 응답 형식과 동일하게 맞춤
    return NextResponse.json({
      status: response.status,
      data: response.data
    });

  } catch (error) {
    console.error('Signup Error:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      return NextResponse.json(
        { message: error.response?.data?.message || '회원가입 중 오류가 발생했습니다.' },
        { status: error.response?.status || 500 }
      );
    }
    
    return NextResponse.json(
      { message: '서버 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}