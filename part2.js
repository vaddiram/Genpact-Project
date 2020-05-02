/*data model given for the task*/
let acctData = [
  {
    acctNum: "AAA - 1234",
    user: "Alice"
  },
  {
    acctNum: "AAA - 5231",
    user: "Bob"
  },
  {
    acctNum: "AAA - 9921",
    user: "Alice"
  },
  {
    acctNum: "AAA - 8191",
    user: "Alice"
  }
];
let balance = {
  "AAA - 1234": 4593.22,
  "AAA - 9921": 0,
  "AAA - 5231": 232142.5,
  "AAA - 8191": 4344
};
/*Datamodel closed*/

/*User defined object to acomplish the task*/
var task = {
  dataFilter : function(ur, srB, srD) {

    //declaring the all the variables
    let dummyArr,accArr,tempArr;

    //assigning the values
    dummyArr = acctData;
    accArr = [],tempArr = [];

    // checking the condition user
    if (ur!=='' && ur!=undefined) {
      tempArr = dummyArr.filter(
        dummyArr =>
          dummyArr["user"].toLowerCase().indexOf(ur.toLowerCase()) !== -1
      );
      // checking any record to found by checking length
      if (tempArr.length > 0) {
        tempArr.forEach(element => {
          accArr.push(element.acctNum);
        });
      }
    }
    //checking sortby condition
    if (srB!=='' && srB !== undefined) {
      accArr = [];
      if (tempArr.length === 0) {
        tempArr = dummyArr;
      }
      //sortby accountnumber or balance
      tempArr = this.sortByBalOrAccNum(srB, tempArr);
      if (tempArr.length > 0) {
        tempArr.forEach(element => {
          accArr.push(element.acctNum);
        });
      }
      //console.log('test==>>');
      //console.log(accArr);
    }
    //checking sort direction 
    if (srD!=='' && srD!== undefined) {
      //sort direction either accending or decending order
      tempArr = this.sortByDirection(srD, srB, tempArr);
      accArr = [];
      if (tempArr.length > 0) {
        tempArr.forEach(element => {
          accArr.push(element.acctNum);
        });
      }
    }
    return accArr;
  },
  sortByBalOrAccNum : function(accNumOrBalance, dummyArr) {
    if (accNumOrBalance === "ByAccNum") {
      dummyArr.sort((a, b) => {
        if (a.acctNum < b.acctNum) return -1;
        if (a.acctNum > b.acctNum) return 1;
        return 0;
      });
      return dummyArr;
    } else {
      //alert('Hi');
      dummyArr.sort((a, b) => {
        if (balance[a] < balance[b]) {
          return -1;
        }
        if (balance[a] > balance[b]) {
          return 1;
        }
        return 0;
      });
      return dummyArr;
    }
  },
  sortByDirection : function(dir, sBy, dummyArr) {
    if (sBy === "ByAccNum") {
      if (dir === "asc") {
        dummyArr.sort((a, b) => {
          if (a.acctNum < b.acctNum) return -1;
          if (a.acctNum > b.acctNum) return 1;
          return 0;
        });
      } else {
        dummyArr.sort((a, b) => {
          if (b.acctNum < a.acctNum) return -1;
          if (b.acctNum > a.acctNum) return 1;
          return 0;
        });
      }
    } else {
      if (dir === "asc") {
        dummyArr.sort((a, b) => {
          if (balance[a] < balance[b]) {
            return 1;
          }
          if (balance[a] > balance[b]) {
            return -1;
          }
          return 0;
        });
      } else {
        dummyArr.sort((a, b) => {  
          if (balance[b] < balance[a]) {
            return -1;
          }
           if (balance[b] > balance[a]) {
            return 1;
          }
          return 0;
        });
      }
    }
    return dummyArr;
  }
}


console.log('Sort data using user "Bob"');
console.log(task.dataFilter("Bob"));
console.log('Sort data using user "Charlie"');
console.log(task.dataFilter("Charlie"));
console.log('Sort data using "Account Number"');
console.log(task.dataFilter(undefined, "ByAccNum"));
console.log('Sort data using user "Alice", "balance" and "asc" order ');
console.log(task.dataFilter("Alice", "balance", "asc"));
console.log('Sort data using user "Alice", "balance" and "desc" order ');
console.log(task.dataFilter("Alice", "balance", "desc").reverse());
console.log('Sort data using user "Alice", "Account Number" and "desc" order ');
console.log(task.dataFilter("Alice", "ByAccNum", "desc"));
