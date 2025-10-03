import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DiaryDetailSaveType } from "../../types/diary.types";
import { jwtDecode } from "jwt-decode";
import type { TokenPayload } from "../../types/user.types";

interface StateProps {
   diaryState: DiaryDetailSaveType
   setDiaryState: React.Dispatch<React.SetStateAction<DiaryDetailSaveType>>
   editDiaryId: number | undefined
}


function DiaryImageForm({ diaryState, setDiaryState, editDiaryId }: StateProps) {

   const nav = useNavigate();

   console.log("이미지폼에서 받은 아이디", editDiaryId);


   const [userId, setUserId] = useState<number | undefined>();
   // 토큰 가져오기
   const token = localStorage.getItem("token");
   // 가져온 토큰 업데이트
   useEffect(() => {
      if (token) {
         const decoded = jwtDecode<TokenPayload>(token);
         setUserId(decoded.userId)
      }
   }, [token, setUserId])



   // 이미지 스타일 옵션
   const styleOptions = [
      { id: 'photorealistic', label: '실사', previewImage: 'https://picsum.photos/id/237/200/300' },
      { id: 'anime-style', label: '애니메이션', previewImage: 'https://picsum.photos/seed/picsum/200/300' },
      { id: 'watercolor-painting', label: '수채화', previewImage: 'https://picsum.photos/200/300?grayscale' },
      { id: 'pixel-art', label: '픽셀 아트', previewImage: 'https://picsum.photos/id/237/200/300' },
      { id: 'pencil-sketch', label: '연필 스케치', previewImage: 'https://picsum.photos/seed/picsum/200/300' },
      { id: 'digital-art', label: '디지털 아트', previewImage: 'https://picsum.photos/200/300?grayscale' },
   ];

   const [selectedStyle, setSelectedStyle] = useState('photorealistic');
   // 현재 캐러셀의 위치(인덱스)를 추적하는 상태
   const [currentIndex, setCurrentIndex] = useState(0);

   const itemWidth = 208 + 16; // 아이템 너비 + 갭
   const visibleItems = 1; // 1개 출력
   const maxIndex = styleOptions.length - visibleItems;

   // 현재 인덱스에 따라 track의 위치를 계산
   const trackStyle = {
      transform: `translateX(-${currentIndex * itemWidth}px)`,
   };

   // 스타일 캐러셀 조작
   const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
   };

   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : maxIndex));
   };

   // 스타일 상태값 변경
   useEffect(() => {
      setSelectedStyle(styleOptions[currentIndex].id)
   }, [currentIndex])





   const [option, setOption] = useState<string>("") // 추가 요청사항 상태값

   // 입력값 변경 핸들러
   function handleOptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setOption(e.target.value)
   }




   // 이미지 생성 요청
   async function handleImageGenerate() {
      alert("이미지 생성 중입니다. 10~15초 소요되니 잠시만 기다려주세요")
      try {
         const obj = {
            userId: userId,
            title: diaryState.title,
            content: diaryState.content,
            style: selectedStyle,
            option: option
         }
         const res = await axios.post("/api/image-generate", obj)
         setDiaryState({
            ...diaryState,
            imageUrl: res.data
         })
      } catch (err) {
         console.log(err);
      }
   }


   // 일기 저장 요청
   async function handleDiarySave() {
      if (editDiaryId) { // 값이 있으면 일기 수정
         const obj = {
            id: editDiaryId,
            title: diaryState.title,
            content: diaryState.content,
            mood: diaryState.mood,
            imageUrl: diaryState.imageUrl, // 이미지를 다시 생성하지 않았다면 null이 들어있다
            imageType: "diary"
         }
         try {
            alert("수정 중입니다. 잠시만 기다려주세요")
            const res = await axios.patch("/api/diary", obj)
            alert("저장 완료")
            nav(`/diary/detail/${res.data}`)
         } catch (err) {
            console.log(err);
         }

      } else { // 없으면 새로운 일기 저장
         const obj = {
            userId: userId,
            title: diaryState.title,
            content: diaryState.content,
            mood: diaryState.mood,
            imageUrl: diaryState.imageUrl,
            imageType: "diary"
         }
         try {
            alert("저장 중입니다. 잠시만 기다려주세요")
            const res = await axios.post("/api/diary", obj)
            alert("저장 완료")
            nav(`/diary/detail/${res.data}`)
         } catch (err) {
            console.log(err);
         }
      }

   }





   return (
      <>
         <div className="flex flex-col justify-center">
            <div className="w-full max-w-2xl mx-auto">
               <h3 className="text-lg font-semibold mb-3">원하는 이미지 스타일을 선택하세요:</h3>
               <div className="relative">
                  <div className="overflow-hidden rounded-lg w-52 mx-auto">
                     <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={trackStyle}>
                        {styleOptions.map((style) => (
                           <div key={style.id} className="flex-shrink-0 w-52">
                              <button type="button" onClick={() => {
                                 setSelectedStyle(style.id)
                                 console.log(selectedStyle);

                              }}
                                 className={`w-full rounded-lg overflow-hidden transition-all focus:outline-none ${selectedStyle === style.id ? 'ring-4 ring-indigo-500' : 'ring-1 ring-gray-300'}`}>
                                 <img src={style.previewImage} alt={style.label} className="w-full h-48 object-cover" />
                                 <span className="block text-center py-2 text-sm font-semibold bg-gray-200">{style.label}</span>
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                  {currentIndex > 0 && (<button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-0 z-10 ...">&#10094;</button>)}
                  {currentIndex < maxIndex && (<button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-0 z-10 ...">&#10095;</button>)}
               </div>
            </div>


            <div className="flex flex-col items-center mt-6 mb-4">
               <label htmlFor="option">추가 요청사항</label>
               <textarea onChange={handleOptionChange} className="h-32 w-52 bg-slate-300 rounded-md" name="option" id="option" value={option} placeholder="요청사항을 작성하세요"></textarea>
            </div>
            {!diaryState.imageUrl
               ? <button onClick={handleImageGenerate} className="bg-rose-200 mx-auto p-1 rounded-md">이미지 생성하기</button>
               : <div className="flex flex-col gap-2">
                  <button className="bg-rose-200 mx-auto p-1 rounded-md" onClick={handleImageGenerate}>다시 생성하기</button>
               </div>
            }
            {diaryState.imageUrl || editDiaryId ?
               <button className="bg-blue-200 mx-auto p-1 rounded-md mt-2" onClick={handleDiarySave}>일기 저장하기</button>
               : ""
            }
         </div>
      </>
   );
}

export default DiaryImageForm;