
export interface DiaryInputType  {
   title: string
   content: string
   mood: string
}

export interface DiaryDetailType extends DiaryInputType {
   imageName: string
}

export interface DiaryDetailSaveType extends DiaryDetailType {
   imageUrl: string
   imageType: string
}

// 일기 목록 출력(Diary.tsx)
export type DiaryListType = [{
      id: number // 일기 PK
      title: string
      mood: string
      createdAt: string
      savedDiaryImageName: string
   }]