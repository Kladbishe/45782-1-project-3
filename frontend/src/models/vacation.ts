export default interface Vacation {
  id: string,
  destination: string,
  description: string,
  startDate: string,
  endDate: string,
  price: number,
  imageName: string,  
  imageUrl: string,  
  likesCount: number,
  createdAt: string,
  updatedAt: string,
  isLiked?: boolean    
}