export default function getTodayDate() {
    const nowUTC = new Date();
    const nowKorea = new Date(nowUTC.getTime() + 9 * 60 * 60 * 1000); // 한국 시간으로 변환
    console.log(nowKorea);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
  
    const year = nowKorea.getFullYear();
    const month = (nowKorea.getMonth() + 1).toString().padStart(2, '0');
    const day = nowKorea.getDate().toString().padStart(2, '0');
    const dayOfWeek = days[nowKorea.getDay()];
  
    return `${year}. ${month}. ${day} (${dayOfWeek})`;
  }
  