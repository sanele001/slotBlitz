import { Slot } from '../types/slot';

class DisplayGroups {
	private groupData: Slot[];
	private groupSize: number;

	constructor(groupData: Slot[], groupSize: number) {
		this.groupData = groupData;
		this.groupSize = groupSize;
	}

	featuredGroup() {
		const groupedData = this.groupData.slice(0, this.groupSize);
		return groupedData;
	}

	topGamesGroup() {
		//
	}
}

export default DisplayGroups;
