import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/types";
import type { DiaryDetailSaveType } from "../../types/diary.types";



function DiaryImageForm() {

   const nav = useNavigate();
   const userId = useSelector((state: RootState) => { return state.userInfo?.id })
   const location = useLocation();
   // const { id } = useParams();
   const [option, setOption] = useState<string>("") // 추가 요청사항 상태값

   const [diaryState, setDiaryState] = useState<DiaryDetailSaveType>({
      title: location.state.title,
      content: location.state.content,
      mood: location.state.mood,
      imageUrl: "",
      imageType: "",
      imageName: "",
   })


   // 입력값 변경 핸들러
   function handleOptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      setOption(e.target.value)
   }

   // // 일기 정보 출력
   // useEffect(() => {
   //    (async () => {
   //       const res = await axios.get(`/api/diary/detail/${id}`)
   //       setDiaryState({
   //          ...diaryState,
   //          title: res.data.title,
   //          content: res.data.content,
   //          mood: res.data.mood,
   //          imageName: res.data.diaryImage?.uuidDiaryImgName
   //       })
   //    })()
   // }, [])


   // 이미지 생성 요청
   async function handleImageGenerate() {
      alert("이미지 생성 중입니다. 10~15초 소요되니 잠시만 기다려주세요")
      try {
         const res = await axios.post("/api/image-generate", { request: diaryState.content + " 이 일기를 바탕으로 이미지를 만들어줘 이미지는 뒤의 요청에 맞게 만들어줘 " + option })
         // setImageUrl(res.data)
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
      const obj = {
         userId: userId,
         title: diaryState.title,
         content: diaryState.content,
         mood: diaryState.mood,
         imageUrl: diaryState.imageUrl,
         imageType: "diary"
      }
      try {
         const res = await axios.post("/api/diary", obj)
         alert("저장 완료")
         alert(res.data)
         nav(`/diary/detail/${res.data}`)
      } catch (err) {
         console.log(err);
      }
   }


   // 일기 작성 폼으로 돌아가기
   function handelDiaryModify() {
      nav("/diary-form", { // 상태값 전달
         state: {
            title: diaryState.title,
            content: diaryState.content,
            mood: diaryState.mood
         }
      })
   }





   const styleOptions = [
      { id: 'photorealistic', label: '실사', previewImage: 'https://picsum.photos/id/237/200/300' },
      { id: 'cartoon', label: '카툰', previewImage: 'https://picsum.photos/seed/picsum/200/300' },
      { id: 'watercolor', label: '수채화', previewImage: 'https://picsum.photos/200/300?grayscale' },
      { id: 'pixel-art', label: '픽셀 아트', previewImage: 'https://picsum.photos/id/237/200/300' },
      { id: 'van-gogh', label: '반 고흐', previewImage: 'https://picsum.photos/seed/picsum/200/300' },
      { id: 'line-art', label: '라인 아트', previewImage: 'https://picsum.photos/200/300?grayscale' },
      { id: '3d-render', label: '3D 렌더', previewImage: 'https://picsum.photos/id/237/200/300' },
   ];


   const [selectedStyle, setSelectedStyle] = useState('photorealistic');
   // 현재 캐러셀의 위치(인덱스)를 추적하는 상태
   const [currentIndex, setCurrentIndex] = useState(0);

   const itemWidth = 208 + 16; // 아이템 너비 + 갭
   const visibleItems = 1; // 1개 출력
   const maxIndex = styleOptions.length - visibleItems;

   const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
   };

   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : maxIndex));
   };

   // 현재 인덱스에 따라 track의 위치를 계산
   const trackStyle = {
      transform: `translateX(-${currentIndex * itemWidth}px)`,
   };



   return (
      <>
         <div className="flex flex-row mt-8 mx-auto gap-14 justify-center items-center">
            <div className="bg-gray-100 flex flex-col items-center w-1/3 border rounded-lg shadow-md pb-12 h-[512px] relative p-5">
               <br />
               <br />
               <h3 className="font-bold text-xl text-neutral-600">{diaryState.title}</h3>
               <br />
               <br />
               <p className="text-neutral-700 text-sm">{diaryState.content}</p>
               <button onClick={handelDiaryModify} className="absolute bottom-4 right-4 border-2 border-neutral-300 rounded-md bg-neutral-200 hover:bg-neutral-300 p-1">일기 수정하기</button>
            </div>
            <div className="flex flex-col justify-center">




               <div className="w-full max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold mb-3">원하는 이미지 스타일을 선택하세요:</h3>
                  <div className="relative">
                     <div className="overflow-hidden rounded-lg w-52 mx-auto">
                        <div className="flex gap-4 transition-transform duration-300 ease-in-out" style={trackStyle}>
                           {styleOptions.map((style) => (
                              <div key={style.id} className="flex-shrink-0 w-52">
                                 <button type="button" onClick={() => setSelectedStyle(style.id)}
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
                  ? <button onClick={handleImageGenerate} className="bg-blue-200 mx-auto p-1 rounded-md">이미지 생성하기</button>
                  : <div className="flex flex-col gap-2">
                     <button className="bg-rose-200 mx-auto p-1 rounded-md" onClick={handleImageGenerate}>다시 생성하기</button>
                     <button className="bg-blue-200 mx-auto p-1 rounded-md" onClick={handleDiarySave}>일기 저장하기</button>
                  </div>
               }
            </div>
            <div className="bg-red-200 flex flex-col items-center w-1/3 border rounded-lg shadow-md pb-12 h-[512px]">
               {diaryState.imageUrl &&
                  <img src={diaryState.imageUrl} width="512px" height="512px" alt="생성된 이미지" className="rounded-lg" />
               }
            </div>
         </div>

      </>
   );
}

export default DiaryImageForm;