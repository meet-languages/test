import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from '../../../User';
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
          <li><a href="home.html">Home</a></li>
          <li><a href="search.html">Search</a></li>
          <li class="active"><a routerLink="/template/users" routerLinkActive="active">Members</a></li>
          <li><a href="groups.html">Groups</a></li>
          <li><a href="meetings.html">Meetings</a></li>
           <li><a href="index.html"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
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
    <!-- Message -->
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Write a message</h4>
                </div>
                <div class="modal-body">
                  <form>
                    <textarea class="form-control noresize" rows="5" id="comment"></textarea>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Send</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      <div class="col-sm-2">
        <panel-user></panel-user>
      <div id="searchPanel" class="well">
        <friends-online></friends-online>
      </div>
        <div id="searchPanel" class="well">
          <div class="form-group">

                <h4><span class="glyphicon glyphicon-search"></span> Search:</h4>
                <hr>
                <form action="">
                <input type="text" name="searchAds" class="col-xs-12">
    
                <button type="submit" class="btn btn-default">Submit</button>
              </form>
            </div>
      </div>
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
  providers: [UserService],
  styleUrls: ['/style/style.css']
})
export class TemplateComponent  { }
