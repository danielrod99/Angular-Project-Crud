import { Component, OnInit } from '@angular/core';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {
  public title:string;
  public project:Project;
  public status:boolean;
  public failed:boolean;
  constructor(
    private _projectService:ProjectService
  ) {
    this.status=false;
    this.failed=false;
    this.title='Crear Proyecto';
    this.project=new Project('','','','',2020,'','');
   }

  ngOnInit(): void {
  }
  onSubmit(projectForm){
   this._projectService.saveProject(this.project).subscribe(
     response=>{
      //console.log(response);
      if(response.project){
        this.status=true;
        projectForm.reset();
      }else{
        this.status=false;
        this.failed=true;
      }
     },
     error=>{
       this.failed=true;
       console.log(error);
     }
   )
  }

}
