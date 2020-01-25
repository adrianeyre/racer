export default interface IIFileService {
	readFile(level: number): Promise<number[][]> ;
}