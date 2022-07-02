const username=document.getElementById('name');
const email=document.getElementById('email');
const phone=document.getElementById('phone');
const password=document.getElementById('password');

const btn=document.querySelector('.submitBtn')

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const userDetails={
        name:username.value,
        email:email.value,
        phone:phone.value,
        password:password.value
    }
    console.log(userDetails)
    axios.post('http://localhost:4000/user/signup', userDetails)
    .then((res)=>{
        if(res.status==200){
            alert('sign up sucessfully')
            //alert(res.data.message)
            window.location.href = "/login/login.html"
        }
    })
    .catch(err=> console.log(err))
})
