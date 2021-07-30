import { Component, OnInit } from '@angular/core';
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

  msg: string = ' * Power (kW) is between Min 0.5 kW and 100 kW for all clients. Default city is Madrid. Select true if client contract bonus for extra consumption.'
  message: string = '';
  error: string = '';

  displayedColumns: string[] = ['_id', 'name', 'power', 'consumption', 'difference', 'city', 'bonus'];
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

    let data = this.form.value;
    let name = data.name.trim();

    if(name === '' || name.length < 3 ) { this.error = 'Need name or to short (Min length 2 characters).'; this.resetResponse();} else {

      if(data.power < 0.5 || data.power > 100 ){ this.error = 'The power shout be 0.5 kW to 100 kW Max.'; this.resetResponse();} else {

         if (data.consumption < 0 || (data.power*2) < data.consumption) {

          this.error = 'The consumption (kW) can not 200% more than Power(kW) Max.'; this.resetResponse();} else {
            console.log(typeof data.city)
            let city = this.cities.find(x => x.id === data.city)

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
                      console.log(err)
                      this.error = err.message;
                      this.resetResponse();
                });
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

  async ngOnInit() {
    await this.serviceApi.getAll().then((res) => {
      //console.log(res)
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

}
