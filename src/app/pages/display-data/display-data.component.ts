import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import ArrayStore from "devextreme/data/array_store";
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent {
  dataSource: any;
  priority: any[];

  constructor(httpClient: HttpClient) {
    this.dataSource = new CustomStore({
      key: "login.uuid",
      load: function (loadOptions: any) {
        return httpClient.get('https://randomuser.me/api/?results=100&nat=US&seed=c742b7d1b05e107b', { params: {} })
            .toPromise()
            .then((data: any) => {
                return {
                  data: data.results
                };
            })
            
      .catch(error => { console.log(error); throw 'Data Loading Error';  });
      }
  });
  }
  gender(rowData){
    return rowData.gender;
  }
  picture(rowData){
    return rowData.picture.thumbnail;
  }
  phoneNumber(rowData){
    return rowData.phone;
  }
  calculateName(rowData) {
    return rowData.name.first + " " + rowData.name.last;
}
}

