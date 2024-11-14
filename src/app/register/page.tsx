"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { API_URL } from "@/app/api/[auth]/[...nextauth]/constant";


// 폼 데이터 타입 정의
interface FormData {
  nickname: string;
  age: string;
  height: string;
  weight: string;
  profileImage: File | null;
  medicalCondition?: string; // 의료 상태 (옵션)
}

const PersonalInfoPage = () => {
  // 기본 프로필 이미지 URL 설정
  const defaultProfileImage = "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"; // 기본 이미지 경로

  // 상태 변수 설정
  const [formData, setFormData] = useState<FormData>({
    nickname: "",
    age: "",
    height: "",
    weight: "",
    profileImage: null,
  });

  // 이미지 미리보기 URL 상태 추가
  const [profileImagePreview, setProfileImagePreview] = useState<string>(defaultProfileImage);

  // 입력값 변화 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 프로필 이미지 파일 처리
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: file,
      }));
      // 미리보기 이미지 업데이트
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 폼 데이터 객체를 JSON으로 변환
    const dataToSend = {
      nickname: formData.nickname,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
    };

    const formDataToSend = new FormData();
    // JSON 데이터를 FormData로 추가
    for (const key in dataToSend) {
      formDataToSend.append(key, dataToSend[key as keyof typeof dataToSend]);
    }

    // 프로필 이미지가 있을 경우 첨부
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      // Axios로 백엔드 API에 POST 요청을 보냄
      const response = await axios.post(`${API_URL}/register/test01`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 요청이 성공하면 응답 처리
      if (response.status === 200) {
        alert("Data submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data.");
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex flex-col mt-10">
        <div>
          <h1 className="font-bold text-2xl" >회원정보</h1>
          <div className="mt-6">
            <img
              src={profileImagePreview}
              alt="Profile Preview"
              className="w-[100px] h-[100px] object-cover rounded-full mt-2"
            />
          </div>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex justify-end items-center -mt-2">
            <button
              type="button"
              onClick={() => document.getElementById("profileImage")?.click()}
              className="px-2 py-2 text-sm cursor-pointer bg-gray-500 border-none rounded"
            >
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="nickname" className="flex items-center mt-20 text-gray-400">닉네임: </label>
          <div className="flex items-center">
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="border-0 border-b border-blue-500 focus:outline-none focus:border-blue-700 w-60 mt-3"
            />
          </div>

          <div className="flex justify-around items-center mt-10 space-x-16">
            <label htmlFor="age" className="text-gray-400">나이</label>
            <div>
              <label htmlFor="height" className="text-gray-400">신장(cm)</label>
              <label htmlFor="weight" className="text-gray-400"> / 체중 (kg): </label>
            </div>
          </div>

          <div className="flex justify-center items-center mt-3 space-x-14">
            <div>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border-0 border-b border-blue-500 focus:outline-none focus:border-blue-700 w-12"
              />
            </div>

            <div className="flex justify-center items-center space-x-5">
              <div>

                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border-0 border-b border-blue-500 focus:outline-none focus:border-blue-700 w-12"
                />
              </div>
              <div>/</div>
              <div>

                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border-0 border-b border-blue-500 focus:outline-none focus:border-blue-700 w-12"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="flex items-center mt-20 fixed bottom-0 mb-10 px-40 py-3 font-bold text-xl cursor-pointer border-none rounded bg-gray-500">다음</button>
      </form>
    </div>
  );
};

export default PersonalInfoPage;
