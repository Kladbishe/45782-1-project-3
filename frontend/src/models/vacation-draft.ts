export default interface VacationDraft{
    destination: string,
    description: string,
    startDate: string,
    endDate: string,
    price: number,
    likesCount: number,
    image: File | null
}