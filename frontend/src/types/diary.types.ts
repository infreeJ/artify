

export interface ToastEditorProps {
   value?: string;
   height?: string;
   onChange?: (value: string) => void;
}


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