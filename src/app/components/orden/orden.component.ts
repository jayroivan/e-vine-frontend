import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  ordenes: Orden[] = []

  displayedColumns: string[] = ['demo-numero', 'demo-fecha', 'demo-total', 'demo-usuario'];
  dataSource!: MatTableDataSource<Orden>;
  constructor(
    private ordenService: OrdenService
  ) { }

  ngOnInit(): void {
    this.CargarDatos();
  }

  CargarDatos(){
    this.ordenService.get().subscribe((res) => {
      this.ordenes = res;

      this.dataSource = new MatTableDataSource(this.ordenes);
    })
  }

}
