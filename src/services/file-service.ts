import axios from 'axios';

import IIFileService from './interfaces/file-service';

export default class IFileService implements IIFileService {
	public readLevel = async(level: number): Promise<number[][]> => {
		const response = await axios({
			method: 'get',
			url: `./levels/level${ level.toString().length === 1 ? '0' : ''}${ level }.dat`,
		});

		return response.data;
	}

	public readPlayerData = async(level: number): Promise<number[]> => {
		const response = await axios({
			method: 'get',
			url: `./levels/player-data${ level.toString().length === 1 ? '0' : ''}${ level }.dat`,
		});

		return response.data;
	}
}
