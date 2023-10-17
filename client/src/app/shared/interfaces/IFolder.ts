export interface IFolder{
    id: string,
    user: string,
    name: string,
    created_at : string,
    updated_at: string,
    path: string,
    status: "ongoing" | "failed" |"succeeded"
}