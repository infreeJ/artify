export interface DecodedToken {
   sub: string; // loginId
   id: number;
   name: string;
   profileImageUrl: string | null
   exp: number;
}