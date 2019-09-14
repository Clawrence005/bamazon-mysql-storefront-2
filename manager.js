var Employee = function employeePortal() {
  var Table = require('cli-table');

  // instantiate
  var table = new Table({
    head: ['TH 1 label', 'TH 2 label']
    , colWidths: [100, 200]
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  table.push(
    ['First value', 'Second value']
    , ['First value', 'Second value']
  );
}
module.exports = Employee;