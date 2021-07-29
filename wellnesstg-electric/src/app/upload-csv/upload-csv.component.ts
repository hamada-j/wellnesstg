import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Papa } from 'ngx-papaparse';
import { Customer } from '../model/model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss'],
  animations: [
    trigger('fadeInOut', [
     state('in', style({ opacity: 100 })),
     transition('* => void', [
     animate(300, style({ opacity: 0 }))
     ])
    ])
  ]
})

export class UploadCSVComponent implements OnInit {
  data: Customer[] = [];
  show: boolean = false;
  msg: string = '';
  fileName: string = '';

  constructor(private papa: Papa, public dialog: MatDialog, private serviceApi: ApiService, private router: Router) { }

  ngOnInit(){}

  handleFileSelect(event: any) {
    this.data = [];
    let files = event.target.files;
    let file = files[0];
    if (file && file !== undefined && file !== null && file !== [] ) {
      this.accessLabel(file.name, "green")
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event: any) => {
        let csv = event.target.result;
        this.papa.parse(csv, {
          skipEmptyLines: true,
          header: true,
          complete: (results) => {
            for (let i = 0; i < results.data.length; i++) {
              let element: Customer = {
                _id: results.data[i].id,
                name: results.data[i].name,
                power: results.data[i].power,
                consumption: results.data[i].consumption,
                difference: results.data[i].difference,
                city: results.data[i].city,
                bonus: results.data[i].bonus,
              };
              if (!Object.values(element).every(el => el === undefined)) this.data.push(element);
            }
            if (this.data !== [] && file.name !== '') {
              this.show = true
              this.fileName = file.name;
            }
          }
        });
      }

    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(Preview, {
      width: '100%',
      data: {
        dataKey: this.data
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        await this.serviceApi.sendCSV([this.fileName, this.data]).then(res => {
          this.msg = res.msg
          this.resetResponse()
        }).catch(err => { console.log(err); });
      }
    })

  }

  accessLabel(name: string, color: string){
    const inputName = document.getElementById('label-file') as HTMLLabelElement;
    inputName.innerText = name;
    inputName.style.background = color
  }

  resetResponse(){
    setTimeout(async () => {
      this.msg = '';
      window.location.reload();
    }, 2000);
  }
}


@Component({
  selector: 'preview',
  templateUrl: `preview.html`,
  styles: ['table { width: 100%; }']
})
export class Preview implements OnInit {

  showMsg: boolean = false;
  msg: string = '';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {}
  displayedColumns: string[] = ['id', 'name', 'power', 'consumption', 'difference', 'city', 'bonus'];
  dataSource = this.data.dataKey;

  ngOnInit(){
      this.dataSource = this.data.dataKey
  }

}

