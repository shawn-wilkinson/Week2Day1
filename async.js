const Promise = require('bluebird');

function diceSync(){
  return Math.floor(Math.random() * 6) + 1
}

let rolls = [0,0,0].map(x => diceSync());
console.log('rolls:', rolls);


function diceCallback(cb){
  setTimeout(function(){
    let roll = diceSync();
    cb(roll);
  }, 100);
}

// let values = [];
// diceCallback(function(roll1){
//   diceCallback(function(roll2){
//     diceCallback(function(roll3){
//       values.push(roll1,roll2,roll3)
//       console.log('cb rolls:', values);
//     });
//   });
// });


function dicePromise(){
  return new Promise(function(resolve,reject){
    diceCallback(function(roll){
      console.log('inside dicePromise:', roll);
      if(roll < 5){
        resolve(roll);
      } else {
        reject(new Error('Too large'))
      }
    });
  });
};


dicePromise()
.then(function(roll){
  console.log('dice promise:', roll);
  return dicePromise();
})
.then(function(roll){
  console.log('dice promise:', roll);
  return dicePromise();
})
.then(function(roll){
  console.log('dice promise:', roll);
})
.catch(function(err){
  console.log('catch error:', err.message);
});

// Promise.all([dicePromise(),dicePromise(),dicePromise()])
// .then(function(rolls){
//   console.log('promise.all', rolls);
// })
