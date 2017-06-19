import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main',
  template: `<nav class="navbar navbar-default">
    <div class="container-fluid">
      <a href="#">
      <div class="navbar-left">
        <span class="navbar-brand brand-name">
        <img class="img-responsive2" src="img/mlg.png">
        <h4 style="color: #ec7820">MEETLANGUAGES</h4>
        </span>
      </div>
      </a>
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>


      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav navbar-right">
          <li class="active"><a routerLink="/template/home" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/template/search" routerLinkActive="active">Search</a></li>
          <li><a routerLink="/template/users" routerLinkActive="active">Members</a></li>
          <li><a routerLink="/template/groups" routerLinkActive="active">Groups</a></li>
          <li><a routerLink="/template/meetings" routerLinkActive="active">Meetings</a></li>
           <li><a href="#" [routerLink]="['/registry']"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-fluid text-center" id="form">
    <div class="col-sm-6 col-sm-offset-2 text-left well">

    <div>

      <router-outlet></router-outlet>

    </div>

    </div>
      <div class="col-sm-2">
        <panel-user></panel-user>
      <div id="searchPanel" class="well">
        <friends-online></friends-online>
      </div>
        <user-search></user-search>
    </div>
  </div>


  <!-----------------------------------Social media---------------------------------->
        <div id="mySidenav" class="sidenav" >
          <a href="#" id="facebook">Facebook <img src="img/social/facebook.png" alt="" class="imgSocial"></a>
          <a href="#" id="twitter">Twitter <img src="img/social/twitter.png" alt="" class="imgSocial"></a>
          <a href="#" id="linkedin">Linkedin <img src="img/social/linkedin.png" alt="" class="imgSocial"></a>
          <a href="#" id="github">Github <img src="img/social/git.png" alt="" class="imgSocial"></a>
        </div>


<footer class="container-fluid text-center">
  <p>© 2017 M e e t L a n g u a g e s</p>
</footer>`,
  providers: [],
  styleUrls: ['/style/style.css']
})
export class TemplateComponent { 

}
