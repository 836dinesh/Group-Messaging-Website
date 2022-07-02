const sendBtn=document.getElementById('sendBtn')
// const chatbox=document.getElementById('chatbox')
 const msginput=document.getElementById('msginput')
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
const groupId=JSON.parse(localStorage.getItem("groupId"))
const grna=JSON.parse(localStorage.getItem("groupname"))

//console.log(typeof(groupId))

//greet
const greet=document.querySelector('.greet')
greet.innerHTML=`<h2>Welcome ${userDetails[0].name}</h2>`
const activegrp=document.querySelector('.activegrp')
activegrp.innerHTML=`<h2> ${grna} group is active</h2>`

//storing MSG data to database
sendBtn.addEventListener("click", (e) => {
   //e.preventDefault();
  const msg = msginput.value;
  const username = userDetails[0].name;
  const userId = userDetails[0].id;
  const groupid=groupId
  storemsgtoDB(msg , username, userId,groupid)
    msginput.value=""
});

//getting MSGES data from database
window.addEventListener("DOMContentLoaded", () => {
    const groupid=groupId
    const grpIdObj={
        groupid
    }
console.log(grpIdObj)
  setInterval(() => {
    axios
    .post("http://localhost:4000/user/getmsges",grpIdObj)
    .then((res) => {
      const allMsges = res.data.msges;
      //console.log(allMsges.length)
      let parntEl = document.getElementById("chatbox");
        parntEl.innerHTML=""
      for (let i = 0; i < allMsges.length; i++) {
        //console.log(allMsges[i].msg)
        // parntEl = document.getElementById("chatbox");
        const childEl = document.createElement("li");
        childEl.classList.add("msges");
        childEl.innerHTML = `${allMsges[i].username} : ${allMsges[i].msg}`;
        parntEl.appendChild(childEl);
      }
    })
    .catch((err) => console.log(err));
    
 }, 1000);
 
  
});

function storemsgtoDB(msg, username, userId, groupid){
    const msgObj = {
        msg,
        username,
        userId,
        groupid
    };
    axios
     .post("http://localhost:4000/user/postmsg", msgObj)
     .then((res) => {
          //console.log(res);
          //window.location.reload(true);
        })
     .catch((err) => console.log(err));
}

//-----------------------------------------------------------

//gruop chat front end

//divs

const grpdiv = document.querySelector(".grpdiv");
const title = document.querySelector(".title");
const frndlist = document.querySelector(".frndlist");

//buttons
const makenewgrp = document.getElementById("makenewgrp");
const addfrnds = document.getElementById("addfrnds");
const grpbtnfinal = document.getElementById("grpbtnfinal");

//functioning
makenewgrp.addEventListener("click", () => {
  grpdiv.classList.add("hide");
  title.classList.remove("hide");
});

//for group task getting USERS from database
addfrnds.addEventListener("click", () => {
    
    title.classList.add("hide");
    frndlist.classList.remove("hide");

    axios
    .get("http://localhost:4000/user/getusers")
    .then((res) => {
      const users = res.data.users;
      for (let i = 0; i < users.length; i++) {
        const parEl1=document.querySelector('.addfrndlist')
        const childEl1=document.createElement('button')
        childEl1.classList.add('addfrnd')
        childEl1.setAttribute('id',`${users[i].id}`)
        childEl1.setAttribute('onclick', `addtogrp(${users[i].id})`)
        childEl1.innerHTML=`Add  ${users[i].name}`
        parEl1.appendChild(childEl1)
      }
    })
    .catch((err) => console.log(err));
});

//Make Group
grpbtnfinal.addEventListener("click", (e) => {
    // e.preventDefault();
    frndlist.classList.add("hide");
    grpdiv.classList.remove("hide");
    const grptitle=document.querySelector('.grptitle')
    const groupname=grptitle.value
    const userId=userDetails[0].id
    
    const makegrpObj={
        groupname,
        userId
    }
   
    axios.post('http://localhost:4000/grp/makegrp', makegrpObj)
    .then(res=>{
        console.log(res)
    })
    .catch(err => console.log(err))
    window.location.reload(true)    
});

//get grps
window.addEventListener('DOMContentLoaded', ()=>{
    axios.get('http://localhost:4000/grp/getgrp')
    .then((res)=>{
        const grps=res.data.grps
            grps.forEach(grp=>{
                const parEl2=document.querySelector('.grpnamelist')
                const childEl2=document.createElement('button')
                childEl2.classList.add('grpname')
                childEl2.setAttribute('id', `${grp.id}`);
                childEl2.setAttribute('onclick', `opengrp(${grp.id}, '${grp.groupname}')`)
                childEl2.innerHTML=`${grp.groupname}`
                parEl2.appendChild(childEl2)
            })
    })
    .catch(err => console.log(err))
})

//gruop chat back end
//getting msg from gruops and displaying on screen 
function opengrp(groupId, grpn){
    localStorage.setItem('groupId', JSON.stringify(groupId))
    localStorage.setItem('groupname', JSON.stringify(grpn))
    window.location.reload(true)
}





