const loginBtm=document.querySelector('.loginBtm');
const signupBtn=document.querySelector('.signupBtn');

const email=document.querySelector('#email');
const password=document.querySelector('#password');

loginBtm.addEventListener('click', (e)=>{
    e.preventDefault();
    const loginDetails={
        email:email.value,
        password:password.value
    }
    //console.log(loginDetails)
    axios.post('http://localhost:4000/user/login', loginDetails)
    .then((res)=>{
        console.log(res)
        if(res.status==200){
            alert('sucessfully loged in ')

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userDetails', JSON.stringify(res.data.user))
            window.location.href = "/chatapp/chatapp.html"
        }else {
            throw new Error('Failed to login')
        }
    })
    .catch(err=> {
        document.body.innerHTML += `<div style="color:red;">Invalid email id or Passwrd<div>`;

    })
})