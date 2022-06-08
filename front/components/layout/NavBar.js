import Link from "next/link";
import { useEffect,useState } from "react";
import LoginModal from '../user/LoginModal';
import RegisterModal from '../user/RegisterModal';
export default function NavBar(){

    const [showOptions, setShowOptions] = useState(false)
    const [Islogin,setIslogin]=useState(false)
    const handleShow = () => {
        setShowOptions(!showOptions)
    }  
    useEffect( ()=>{console.log(showOptions)},[showOptions])
    const items=["스터디 모집","마이페이지","추가 메뉴", "프롤로그"]
    const drop_item=["Dashboard","Settings","Earnings","Sign out"]
    function NavItem(item,index){
        return(
        <li key={index}>
          <Link href="/"><a href="#" class="block py-2 pr-4 pl-3  mx-20 font-semibold text-gray-700 border-b border-gray-500 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">{item}</a></Link>
        </li>
        )
    }
    function NavDropItem(item,index){
        return(
            <li key={index}>
          <Link href="/"><a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">{item}</a></Link>
        </li>
        )
    }
    return (
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <Link href="/">
  <a class="flex items-center">
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">의자왕</span>
  </a>
  </Link>
  
  <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
      <li>
        <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
      </li>
      {
            items.map((item,index)=>NavItem(item,index))
    }
    </ul>
    {
        Islogin===true ? (<div class="flex items-center md:order-2">
        <button onClick={handleShow} type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="w-8 h-8 rounded-full" src="favicon.ico" alt="user photo"/>
            </button>
            {showOptions && (
            <div class="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
              <div class="py-3 px-4" >
                <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul class="py-1" aria-labelledby="dropdown" >
              {
                  drop_item.map((item,index)=>NavDropItem(item,index))
              }
              </ul>
            </div>)}
        </div>) : ( <><LoginModal /><RegisterModal /></>)
    }
         
  </div>
  </div>
</nav>
    )
}