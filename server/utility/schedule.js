// 2 modules 1. rececing list of schedules of each classroom.We just have to combine them.
// it will not take care of old schedule..You will have to pass it as arguments.

// return promise
const initialSchedule = [
  // instead of null there will be classroom id
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null], 
];


exports.mergeSchedule = (schedules) => {
    const mergedSchedule = new Array(initialSchedule);
  
    schedules.forEach((schedule) => {
      schedule.forEach((row, i) => {
        row.forEach((class_id, j) => {
          // we will have no collision as other function must already had detected it
          if(class_id!==null){
            if(mergedSchedule[i][j]!==null){
              return({
                error: "First collision at index "+i+", "+j,
              })
            }
            mergedSchedule[i][j] = class_id;
          }
        })
      })
    })
    return(
      mergedSchedule
    );
}
exports.collision = () => {
  console.log(initialSchedule);
}

console.log(exports.mergeSchedule([
 [ [1,null,3] ] ,
 [ [null, 2, 3] ],
]))

// exports.collision();