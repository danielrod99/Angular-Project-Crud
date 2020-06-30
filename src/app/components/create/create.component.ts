import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public url=null;
  public title: string;
  public project: Project;
  public status: boolean;
  public failed: boolean;
  public fileToUpload: Array<File>;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.status = false;
    this.failed = false;
    this.title = 'Crear Proyecto';
    this.project = new Project('', '', '', '', 2020, '', '');
  }

  ngOnInit(): void {
  }
  onSubmit(projectForm) {
    this._projectService.saveProject(this.project).subscribe(
      response => {
        //console.log(response);
        if (response.project) {
          this._uploadService.makeFileRequest(Global.url + '/upload-image/' + response.project._id, [], this.fileToUpload, 'image').then((result: any) => {
            this.status = true;
            projectForm.reset();
            setTimeout(() => {
              this.status = false;
            }, 10000)
          });
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
