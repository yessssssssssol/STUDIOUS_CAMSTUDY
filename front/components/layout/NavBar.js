import Link from "next/link";
import { useEffect,useState ,useRef} from "react";
import LoginModal from '../user/LoginModal';
import RegisterModal from '../user/RegisterModal';
import {useRouter} from 'next/router'
import { tokenAtom } from "../../core/atoms/userState";
import { useRecoilState, useRecoilValue } from 'recoil';
import {useUserActions} from "../../utils/hooks/useUserAction"
import {
    userAtom,
  } from '../../core/atoms/userState';
import { dropboxModalState } from '../../core/atoms/modalState';
import {items,drop_item} from "../common/UseData"
export default function NavBar(){

    const router = useRouter();
    const ref = useRef(null)
    const [showOptions, setShowOptions] = useRecoilState(dropboxModalState)
    const [token, setToken] = useRecoilState(tokenAtom);
    const userActions = useUserActions();
    const userName = useRecoilValue(userAtom);

    const handleShow = () => {
        setShowOptions(true)
    }  
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      });

      function handleClickOutside(event){
        if(ref.current && !ref.current.contains(event.target)){
            setShowOptions(false)
        }
    }
    

    const handleLogout = () => {
		userActions.logout().catch((err) => {
            console.log(err);
          });
	};

    function NavItem(item,index){

        function make_link(invisible)
        {
            return <Link href={item[1]}><a style={{color : router.pathname===item[1] ? "blue": "black"}} class={`${invisible} block border-b`}>{item[0]}</a></Link>
        }

        const invisible="invisible"

        return(
        <ul class="list-none">
            <li key={index} >
                {item[0]==="마이페이지"?(token ? make_link(): make_link(invisible))
                :make_link()}
            </li>
        </ul>
        )
    }
    function NavDropItem(item,index){
        return(
            <li key={index} class="text-center">
          <Link href="/"><a class="block py-2 px-4 text-sm text-gray-700">{item}</a></Link>
        </li>
        )
    }
    return (
<nav class="bg-white   border-gray-200 px-2 py-5 rounded min-w-[690px]">
  <div class="items-center flex justify-between mx-auto min-w-[500px]">
  <Link href="/">
  <a class="ml-[15px]">
      <span class="center text-3xl font-bold whitespace-nowrap">의자왕👑</span>
  </a>
  </Link>

      {
            items.map((item,index)=>NavItem(item,index))
    }
    {
        token ? (<div class="relative flex items-center md:order-2" ref={ref}>
        <button onClick={handleShow} type="button"  class="inline-flex justify-center w-full mx-10 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="w-8 h-8 rounded-full" src="favicon.ico" alt="user photo"/>
            </button>
            {showOptions && (
            <div class="absolute top-9 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" id="dropdown">
              <div class="py-3 px-4" >
                <span class="block text-sm text-gray-900">{userName.name}</span>
                <span class="block text-sm font-medium text-gray-500 truncate">{userName.email}</span>
              </div>
              <ul class="py-1" aria-labelledby="dropdown" >
              {
                  drop_item.map((item,index)=>NavDropItem(item,index))
              }
              <li>
            <button onClick={handleLogout} class="w-full"><a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Sign out</a></button>
            </li>
              </ul>
            </div>)}
        </div>) : ( <span class="flex mr-[15px]"><LoginModal /><RegisterModal /></span>)
    }
         
  </div>
</nav>
    )
}
