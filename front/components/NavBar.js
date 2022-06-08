import Link from "next/link";

export default function NavBar(){

    const items=["스터디 모집","마이페이지","추가 메뉴", "프롤로그"]
    
    function NavItem({item,index}){
        return(
            <li key={index}>
          <Link href="/"><a class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{item}</a></Link>
        </li>
        )
    }
    return(
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
    <Link href="https://flowbite.com"><a class="flex items-center">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">의자왕</span>
    </a>
    </Link>
    <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        
        {
            items.map((item,index)=>NavItem(item,index))
        }
      </ul>
    </div>
    </div>
  </nav>
  )
}