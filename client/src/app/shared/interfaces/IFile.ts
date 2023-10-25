export interface IFile{
    directory:string,
    file:string,
    id:string,
    name:string,
    uploaded_at:string,
}

export interface IFileWrap{
    directory_name: string,
    directory_status: string,
    filesArr: IFile[];
}