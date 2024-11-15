import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface SignUpRequest {
  nickname: string;
  profileImage: string;
  height: number;
  weight: number;
  age: number;
  gender: 'MALE' | 'FEMALE';
  schoolName: string;
  schoolCode: string;
}

export async function POST(request: NextRequest) {
  try {
    // request body를 JSON으로 파싱
    const signUpData: SignUpRequest = await request.json();
    const authorization = request.headers.get('authorization');

    console.log('Received signup data:', signUpData);
    
    const response = await axios.post(
      'http://localhost:8080/members/sign-up',
      signUpData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Signup Error:', error);
    
    if (axios.isAxiosError(error)) {
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