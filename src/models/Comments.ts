export interface IComments {
    id: number
    content: string
    createdAt: string
    updatedAt?: string
    deletedAt?: string
    deletedBy?: string
    userId: string
    userName: string
}