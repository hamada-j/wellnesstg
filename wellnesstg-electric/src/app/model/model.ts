export class Customer {
    id: number;
    name: string;
    power: number;
    consumption: number;
    difference: number;
    city: string;
    bonus: boolean;
    constructor(pId: number, pName: string, pPower: number, pDifference: number, pConsumption: number, pCity: string, pBonus: boolean) {
        this.id = pId;
        this.name = pName;
        this.power = pPower;
        this.consumption = pConsumption;
        this.difference = pDifference;
        this.city = pCity;
        this.bonus = pBonus;
    }
}
