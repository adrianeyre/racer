export default interface IIFileService {
	readLevel(level: number): Promise<number[][]>;
	readPlayerData(level: number): Promise<number[]>;
}