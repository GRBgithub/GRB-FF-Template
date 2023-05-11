/** @format */
const { SCSSwatchadd, SCSSwatchdelete } = require("./Scss");
const { watcher, watcherunliked } = require("./Views");


console.log("--RWATCHER--");

const SCSSadd = SCSSwatchadd();
const SCSSdelete = SCSSwatchdelete();
const VIEWadd = watcher();
const VIEWdelete = watcherunliked();
