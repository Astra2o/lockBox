import React , {useState,useEffect ,useRef} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

function Manager() {
    const [form, setform] = useState({site:"",username:"",password:""})
    const [isshowPass, setisshowPass] = useState(false)
    const [passinputType, setpassinputType] = useState('password')
    const [passwordArray, setpasswordArray] = useState([])
    const ref =useRef();


    useEffect(() => {
        
        let passwords=localStorage.getItem('passwords');
        

        if (passwords) {
         setpasswordArray(JSON.parse(passwords))
        }
    
      
    }, [])
    


    const showPass=()=>{

        if (!isshowPass) {
            setisshowPass(true);
            setpassinputType('text');
        
            setTimeout(() => {
                setisshowPass(false)
            setpassinputType('password');
            }, 3000);

        }else{
            setisshowPass(false)
            setpassinputType('password');

        }
    }

    const handleChange=(e)=>{
        setform({...form, [e.target.name] : e.target.value})

    }
    const savePassword=()=>{

        if (form.site.length>3 && form.username.length>3 && form.password.length>6) {
            
            
            setpasswordArray( [...passwordArray,{...form,id:uuidv4()}])
            
            localStorage.setItem('passwords',JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
            //  console.log([...passwordArray,form]);
            //  console.log(passwordArray);
            
            
            setform({site:"",username:"",password:""})
        } else{
            alert("site and username length should be 3 and password length atleast must be 6  ")
        }


    }
  
     const copyText=(text)=>{
           navigator.clipboard.writeText(text)
           toast.success('🦄 copy to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
            // transition: 'Bounce',
            });
     }

     const deletePassword =(id)=>{
        // alert(id)
    setpasswordArray( passwordArray.filter((item)=>item.id!==id));
    localStorage.setItem('passwords',JSON.stringify( passwordArray.filter((item)=>item.id!==id)))



     }

     const editPassword =(id)=>{
        // alert(id)
        setform(passwordArray.find((item)=>item.id==id))
        setpasswordArray( passwordArray.filter((item)=>item.id!==id));

    
        

     }

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
// transition=' Bounce'
/>

<div className="">
<div class="absolute top-0 -z-10  h-full w-full bg-black"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
<div className="mx-auto  mt-6 flex flex-col justify-center items-center max-w-4xl text-white">
    <h1 className=' text-4xl '>
        Lock BOX
    </h1>
    <p>Your Own Password Manager</p>
</div>
    
    <div className="flex w-96  gap-10 justify-center mt-6 m-auto items-center     text-white flex-col p-4">
        <input value={form.site} onChange={handleChange} placeholder='Enter website url' className='border py-1 px-5  w-full rounded-full border-white bg-transparent' type="text" name='site' id='' />
        <div className="flex gap-3">
            <input onChange={handleChange} value={form.username} placeholder='Username' className='border w-[50%] py-1 px-5  rounded-full border-white bg-transparent' name='username' type="text" />
            <div className="relative">
                <span onClick={showPass} className='absolute top-1 right-2 py-1 '>
                {! isshowPass ? ( <img className='w-5' src="/eye.png" alt="" />):(<img className='w-5' src="/closeeye.png" alt="" />)}
                  {/* <img className='w-7' src="/eye.png" alt="" />   */}
                </span>
            <input value={form.password} name='password' onChange={handleChange} placeholder='Password' type={passinputType} className='border w-full py-1 px-5  rounded-full border-white bg-transparent' />
            </div>
        </div>
     
        <button onClick={savePassword} className='flex border  border-purple-100 bg-purple-600 rounded-full py-2 px-4 gap-2 items-center justify-center'  >
            <lord-icon
    src="https://cdn.lordicon.com/jgnvfzqg.json"
    trigger="hover"
    colors="primary:#ffffff"
    // style="width:250px;height:250px"
    >
</lord-icon>
Save Password 
</button>
    </div>
</div>
<h1 className=' mx-20 my-5 text-white text-2xl'>Your Passwords :</h1>
{passwordArray.length==0? (<div className=' text-white text-xl mx-24 my-5'> No saved password </div>):(
<table class="table-auto border-collapse border  border-purple-600 p-2 rounded-xl overflow-hidden mx-auto w-[80%] text-white">
  <thead className=' bg-purple-600 p-10'>
    <tr>
      <th className='text-center w-32 '>website</th>
      <th className='text-center w-32 '>username</th>
      <th className='text-center w-32 '>password </th>
      <th className='text-center w-32 '>actions </th>
    </tr>
  </thead>
  <tbody>
     {passwordArray.map((item)=>(<>
        <tr className=''>
      <td className='text-center w-32 px10  py-2'><a href={`https://${item.site}`} target="_blank" >{item.site}</a> </td>
      <td className='text-center  relative w-32 px10'> {item.username}
      <span onClick={()=>{copyText(item.username)}} className='  text-[1rem] pl-2  right-0 '><lord-icon 
    src="https://cdn.lordicon.com/xljvqlng.json"
    trigger="hover"
    colors="primary:#ffffff"
    style={{width:'20px',height:'20px'}}
    
    >
</lord-icon></span>
      </td>
      <td className='text-center relative w-32 '>{item.password}
       <span onClick={()=>{copyText(item.password)}} className='  text-[1rem] pl-2  right-0 '><lord-icon 
    src="https://cdn.lordicon.com/xljvqlng.json"
    trigger="hover"
    colors="primary:#ffffff"
    style={{width:'20px',height:'20px'}}
    
    >
</lord-icon></span>
</td>
<td><div className="flex  justify-center gap-2 ">
    <button onClick={()=>{editPassword(item.id)}}><lord-icon
    src="https://cdn.lordicon.com/gwlusjdu.json"
    trigger="hover"
    colors="primary:#ffffff"
    style={{width:'25px',height:'25px'}}>
</lord-icon></button>
    <button onClick={()=>{deletePassword(item.id)}}>
        <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
    colors="primary:#ffffff"
    style={{width:'25px',height:'25px'}}>
</lord-icon></button>
    
    </div></td>
    </tr>  
     </>))}

   
  </tbody>
</table>
) }


    
    </>
  )
}

export default Manager