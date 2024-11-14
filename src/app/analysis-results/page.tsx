import { API_URL } from "../api/[auth]/[...nextauth]/constant";


export const metadata = {
    title: 'Analysis',
}

interface NutritionDetail {
    name: string;
    value: string;
}

interface ApiResponse {
    image: string;
    foodType: string;
    nutritionDetails: NutritionDetail[];
}

async function getResults(): Promise<ApiResponse>{
    const response = await fetch(`${API_URL}/MockServer_Analysis/test01`);
    const json = await response.json();
    return json;
}

export default async function analysisResults() {
    const res = await getResults();
    return (
        <div className="flex justify-center items-center flex flex-col ">
            <h1>1. 이미지</h1>
            <img src={res.image} alt={res.foodType} />
            <h1>2. 음식종류: {res.foodType}</h1>
            <h1>3. 영양성분 결과 </h1>
            <div>
                {res.nutritionDetails.map((nutrition, index) => (
                    <h2 key={index}>{nutrition.name}: {nutrition.value}</h2>
                ))}                
            </div>
            <h1>5. 일일 총 섭취 영양 성분 (요약해서)</h1>
            <div>{JSON.stringify(res)}</div>
        </div>
    );
}