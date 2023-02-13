import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div style="
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center;"
    >
      <h1>Page Not Found</h1>
      <p>Sorry, the page you requested could not be found.</p>
      <button routerLink="/">Go Home</button>
    </div>
  `,
})
export class PageNotFoundComponent {

}
