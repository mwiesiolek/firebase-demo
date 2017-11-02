import {Component} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  coursesRef: AngularFireList<any>;
  courses: Observable<any[]>;
  firstCourse: Observable<any>;

  authors: Observable<any[]>;
  firstAuthor: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.coursesRef = db.list('courses');
    this.courses = this.coursesRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.payload.key, value: c.payload.val()}));
      });
    this.firstCourse = db.object('/courses/1').valueChanges();

    this.authors = db.list('/authors').valueChanges();
    this.firstAuthor = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.coursesRef.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        {title: 'Components'},
        {title: 'Directives'},
        {title: 'Templates'}
      ]
    });
    course.value = '';
  }

  update(course) {
    this.db.object('/courses/' + course.key)
     .set({ // update method updates only given parameters, set replaces everything
       name: course.value + ' UPDATED',
       price: 150,
     });
  }
}
