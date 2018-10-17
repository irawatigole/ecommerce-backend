var count = 0;
function me(){
    console.log(count);
    count ++;
    me()
}
me();