const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
function findEmployeeByName(name, arr){
 arr.forEach(element => console.log(element))
}
// given a name and array of employees, return employee
function findEmployeeByName(name, arr) {
  for (let employee of arr) {
    if (employee.name === name) {
      return employee;
    }
  }
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
function findManagerFor(profile, arr) {
  for (let employee of arr) {
    if (employee.id === profile.managerId) {
      return employee;
    }
  }
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
function findCoworkersFor(profile, arr) {
  let coworkers = [];
  for (let employee of arr) {
    if (
      employee.managerId === profile.managerId &&
      employee.name !== profile.name
    ) {
      coworkers.push(employee);
    }
  }
  return coworkers;
}
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
function findManagementChainForEmployee(profile, arr) {
  if (!profile.managerId) {
    return [];
  } else {
    let manager = arr.find((ele) => profile.managerId === ele.id);
    let chain = findManagementChainForEmployee(manager, arr);
    chain.push(manager);
    return chain;
  }
}
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
function generateManagementTree(arr) {
  // define a helper function that will run recursively
  function branch(arr, manager) {
    let hasReports = arr.find((ele) => ele.managerId === manager.id);
    if (!hasReports) {
      manager.reports = [];
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].managerId === manager.id) {
          if (manager.reports) {
            manager.reports.push(arr[i]);
          } else {
            manager.reports = [arr[i]];
          }
          branch(arr, arr[i]);
        }
      }
    }
  }

  let tree;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].managerId) {
      tree = arr.splice(i, 1)[0];
      // call the recursive function on each child of the tree branch
      branch(arr, tree);
    }
  }
  return tree;
}
// console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
function displayManagementTree(obj) {
  function printName(arr, level) {
    for (let ele of arr) {
      console.log("-".repeat(level), ele.name);
      printName(ele.reports, level + 1);
    }
  }
  printName([obj], 0);
}
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/