import { FileService } from "../files/file.service";

export interface CoreContextModel { serverUrl: string; fileService: FileService }