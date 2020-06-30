import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import {Router,ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public url:string;
  public title: string;
  public project: Project;
  public status: boolean;
  public failed: boolean;
  public fileToUpload: Array<File>;
  constructor(
    private _projectService: ProjectService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _uploadService: UploadService
  ) {
    this.status = false;
    this.failed = false;
    this.title = 'Edit Project';
  }

  ngOnInit(): void {
    this.url=Global.url;
    this._route.params.subscribe(params=>{
      let id = params.id;
      this.getProject(id);
    })
  }
  getProject(id){
    this._projectService.getProject(id).subscribe(response=>{
      this.project=response;
    },error=>{console.log(error)})
  }
  onSubmit(projectForm) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        //console.log(response);
        if (response) {
          if(this.fileToUpload){
            this._uploadService.makeFileRequest(Global.url + '/upload-image/' + response.project._id, [], this.fileToUpload, 'image').then((result: any) => {
              this.status = true;
              setTimeout(() => {
                this.status = false;
              }, 10000)
            });
          }else{
            this.status = true;
                setTimeout(() => {
                  this.status = false;
                }, 10000)
          }

        } else {
          this.status = false;
          this.failed = true;
        }
      },
      error => {
        this.failed = true;
        console.log(error);
      }
    )
  }
  fileChangeEvent(fileInput: any) {
    // console.log(fileInput);
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

}
