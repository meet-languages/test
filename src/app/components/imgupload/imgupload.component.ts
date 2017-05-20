import { Component, Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../../../User';
import { Group } from '../../../Group';

import { AlertService } from '../../_services/alert.service';
import { GroupService } from '../../_services/group.service';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';

@Component({
    moduleId: module.id,
    selector: 'imgupload',
    templateUrl: '/app/components/imgupload/imgupload.component.html',
    styleUrls: ['/style/style.css']

})

@Injectable()
export class imgUploadComponent {
    currentUser: User;
    model: any = { users: [], likes: [] };
    groups: Group[];

    loading = false;
    returnUrl: string;
    message: string;

    constructor(
        private imgService: imgService,
        private route: ActivatedRoute,
        private groupService: GroupService,
        private userService: UserService,
        private router: Router,
        private alertService: AlertService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.users.push(this.currentUser["_id"]);
        this.message = "Select image to upload it";
    }

    /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and
   * makes an Http request with the image file.
   */
  handleInputChange (event: any) {
    var image = event.target.files[0];

    this.imgService.upload(image).subscribe(
        data => {
          this.alertService.success('Image upload succesful', true);
        },
        error => {
          this.alertService.error(error._body);
          this.loading = false;
        }
    );
    this.message="Image uploaded!";
  }

}
