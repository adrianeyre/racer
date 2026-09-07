import axios from 'axios';

import IIFileService from './interfaces/file-service';

/** Two digits, so `3` reads `level03.dat` and `10` reads `level10.dat`. */
const padLevel = (level: number): string => level.toString().padStart(2, '0');

export default class IFileService implements IIFileService {
	public readLevel = async (level: number): Promise<number[][]> => {
		const response = await axios.get<number[][]>(`./levels/level${padLevel(level)}.dat`);

		return response.data;
	};

	public readPlayerData = async (level: number): Promise<number[][]> => {
		const response = await axios.get<number[][]>(`./levels/player-data${padLevel(level)}.dat`);

		return response.data;
	};
}
