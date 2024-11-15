import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
 try {
   const authorization = request.headers.get('authorization');
   
   if (!authorization) {
     return NextResponse.json(
       { message: '인증 토큰이 없습니다.' },
       { status: 401 }
     );
   }

   // JSON 데이터로 받기
   const analysisData = await request.json();
   
   if (!analysisData.imageUrl || !analysisData.type || !analysisData.date) {
     return NextResponse.json(
       { message: '이미지 URL, 타입, 날짜가 모두 필요합니다.' },
       { status: 400 }
     );
   }

   const response = await axios.post('https://foodeat.o-r.kr/diets', {
     type: analysisData.type,
     date: analysisData.date,
     imageUrl: analysisData.imageUrl
   }, {
     headers: {
       'Authorization': authorization,
       'Content-Type': 'application/json',
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