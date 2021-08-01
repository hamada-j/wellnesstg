import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from '../api.service';
import { Customer } from '../model/model';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  isAddMode: boolean = true;
  _id: string | null;

  msg: string = ' * Power (kW) is between Min 0.5 kW and 100 kW for all clients. Default city is Madrid. Select true if client contract bonus for extra consumption.'
  message: string = '';
  error: string = '';

  displayedColumns: string[] = ['_id', 'name', 'power', 'consumption', 'difference', 'city', 'bonus', 'edit', 'delete'];
  arrayResult: any = [];
  cities: any[] = [
    { id: 1, name: 'Madrid' },
    { id: 2, name: 'Sevilla' },
    { id: 3, name: 'Barcelona' },
  ];
  bonuses: any[] = [
    { id: 1, name: 'true' },
    { id: 2, name: 'false' },
  ];

  form: FormGroup;

  constructor(private serviceApi: ApiService) {
    this._id = '';
    this.form = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      power: new FormControl(0, [
        Validators.required,
        this.powerValidator
      ]),
      consumption: new FormControl(0, [
        Validators.required,
      ]),
       difference: new FormControl(0, [
        Validators.required,
      ]),
      city: new FormControl("1", [
        Validators.required,
      ]),
      bonus: new FormControl("2", [
        Validators.required,
      ]),

    })
   }

   powerValidator(control: any ) {
    const edadValue = control.value;
    const maxValue = 100;
    const minValue = 0.5;

    if (edadValue >= minValue && edadValue <= maxValue) {
      // Valid OK
      return null;
    } else {
      return { Power: { max: maxValue, min: minValue } };
    }
  }

  async onSubmit() {
      console.log()
      if(this.form.value.name === null){
          this.error = 'Form is empty'; this.resetResponse();
      }else {
        let data = this.form.value;
        console.log(data)
        this.submitData(data)
      }
  }



  async ngOnInit() {
    await this.serviceApi.getAll().then((res) => {
      //console.table(res);
      this.arrayResult = new MatTableDataSource(res);
    }).catch(err => {
      console.log(err)
      this.error = err.message;
      this.resetResponse();
    });

  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.arrayResult.filter = filterValue.trim().toLowerCase();
  }

   async handleDelete(data: Customer) {
    //console.log(typeof data._id)
    if(confirm("Are you sure to delete "+ data._id)) {
      await this.serviceApi.deleteRecord(data._id)
          .then( res => {
            console.log(res)
            this.message = 'Deleted!'
            this.ngOnInit()
            this.resetResponse();
          })
          .catch(err => {
            console.log(err)
            this.error = err.message;
            this.resetResponse();
          });
    }
  }

  handleEdit(data: Customer) {
    this._id = data._id;
    const city = this.cities.find(x => x.name === data.city);
    const bonus = this.bonuses.find(x => x.name === data.bonus.toString());
    this.form.patchValue({
      name: data.name,
      power: data.power,
      consumption: data.consumption,
      city: city.id.toString(),
      bonus: bonus.id,
    })
    this.isAddMode = false;
  }
    cancelEditMode(event: Event) {
    this._id = '';
    this.form.reset()
    this.isAddMode = true;
  }

   updateName(el: any, pName: any) {
    if (pName === null || pName === '' || pName === undefined) { return; }
      let object = Object.assign({}, el, {name: pName.trim()});
      this.update(object);


  }

   updatePower(el: any, pPower: any) {
     let convertPower = Number.parseInt(pPower)
    if (convertPower == null || convertPower <= 0.4 || convertPower == undefined || typeof convertPower !== 'number' ||isNaN(convertPower)) { return; }
    let object = Object.assign({}, el, {power: convertPower});
    this.update(object);
  }

  updateConsumption(el: any, pConsumption: any) {
     let convertC = Number.parseInt(pConsumption)
    if (convertC == null || convertC < 0 || convertC == undefined || typeof convertC !== 'number' ||isNaN(convertC)) { return; }
    let object = Object.assign({}, el, {consumption: convertC});
    this.update(object);
  }

  updateCity(el: any, pCity: any) {
    if (pCity == null || pCity < '' || pCity == undefined || typeof pCity !== 'string') { return; }
    switch(pCity) {
        case 'Madrid':
              let madrid = this.cities.find(x => x.name === 'Madrid').id.toString();
              let mBonus = this.bonuses.find(x => x.name === el.bonus.toString()).id.toString();
              let m = Object.assign({}, el, {city: madrid, bonus: mBonus});
              this._id = el._id;
              this.isAddMode = false;
               this.submitData(m);
          break;
        case 'Barcelona':
              let barcelona = this.cities.find(x => x.name === 'Barcelona').id.toString();
              let bBonus = this.bonuses.find(x => x.name === el.bonus.toString()).id.toString();
              let b = Object.assign({}, el, {city: barcelona, bonus: bBonus});
              this._id = el._id;
              this.isAddMode = false;
              this.submitData(b);
          break;
        case 'Sevilla':
              let seville = this.cities.find(x => x.name === 'Sevilla').id.toString();
              let sBonus = this.bonuses.find(x => x.name === el.bonus.toString()).id.toString();
              let s = Object.assign({}, el, {city: seville, bonus: sBonus});
              this._id = el._id;
              this.isAddMode = false;
              this.submitData(s);
          break;
        default:
          return;
    }
  }

  updateBonus(el: any, bonus: any) {
    let pBonus = bonus.toLowerCase()
    console.log(pBonus);
    if (pBonus == null || pBonus == undefined ) { return; }
    let object = Object.assign({}, el, {bonus: pBonus});
    console.log(object)
    this.update(object);
  }

  update(object: any) {
    this._id = object._id;
    let record = {
      name: object.name,
      power: object.power,
      consumption: object.consumption,
      difference: object.difference,
      city: this.cities.find(x => x.name === object.city).id.toString(),
      bonus: this.bonuses.find(x => x.name === object.bonus.toString()).id.toString()
    }
    this.isAddMode = false;
    this.submitData(record);
  }

  async submitData(data: any) {
    let name:string = data.name.trim();
      if(name === '' || name.length < 3 ) { this.error = 'Need name or to short (Min length 2 characters).'; this.resetResponse();} else {

        if(data.power < 0.5 || data.power > 100 ){ this.error = 'The power shout be 0.5 kW to 100 kW Max.'; this.resetResponse();} else {

          if (data.consumption < 0 || (data.power*2) < data.consumption) {

            this.error = 'The consumption (kW) can not 200% more than Power(kW) Max.'; this.resetResponse();} else {
                if(this.isAddMode){
                  let diff = data.power - data.consumption;
                  let objectForm: Customer = {
                    _id: null,
                    name: data.name.trim(),
                    power: data.power,
                    consumption: data.consumption,
                    difference: diff,
                    city: this.cities.find(x => x.id === Number(data.city)).name,
                    bonus: JSON.parse(this.bonuses.find(x => x.id === Number(data.bonus)).name),
                  }
                  await this.serviceApi.sendRecord(objectForm).then( res => {
                        this.message = `The record was saved in database correctly with the id ${res._id}`
                        this.resetResponse();
                        this.form.reset();
                        this.serviceApi.action$.emit("refresh");
                        this.ngOnInit();
                  }).catch(err => {
                          this.error = err.message;
                          this.resetResponse();
                    });
                } else {
                  let diff = data.power - data.consumption;
                  let objectForm: Customer = {
                    _id: this._id,
                    name: data.name.trim(),
                    power: data.power,
                    consumption: data.consumption,
                    difference: diff,
                    city: this.cities.find(x => x.id === Number(data.city)).name,
                    bonus: JSON.parse(this.bonuses.find(x => x.id === Number(data.bonus)).name),
                  }
                  await this.serviceApi.editRecord(objectForm).then( res => {
                        console.log(res)
                        this.message = `The record was edited in database correctly.`;
                        this.isAddMode = true;
                        this._id = '';
                        this.resetResponse();
                        this.form.reset();
                        this.serviceApi.action$.emit("refresh");
                        this.ngOnInit();
                  }).catch(err => {
                          console.log(err)
                          this.error = err.message;
                          this.resetResponse();
                    });
                }
            }
        }
      }
  }

  resetResponse(){
    setTimeout(async () => {
      this.message = '';
      this.error = '';
    }, 2000);
  }


}
