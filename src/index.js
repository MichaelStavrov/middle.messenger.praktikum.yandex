import App from './components/App/App';
import Page from './layout/Page';
import routing from './utils/routing';

const root = document.getElementById('root');
root.innerHTML = App();

// const data = {
//   list: [
//     {
//       name: 'John',
//       age: 23,
//       lastName: 'Smith',
//       address: {
//         street: 'bulls',
//         home: 2,
//       },
//     },
//     {
//       name: 'Ivan',
//       age: 25,
//       lastName: 'Petrov',
//       address: {
//         street: 'main',
//         home: 1,
//       },
//     },
//   ],
// };

// Handlebars.registerHelper('join', function () {
//   return this.name + ' ' + this.lastName;
// });

// const template =
//   '<ul>{{#each list}}<li>{{join}} <b>{{#with address}}{{street}} {{home}}{{/with}}</b></li>{{/each}}</ul>';

// const html = Handlebars.compile(template)(data);
