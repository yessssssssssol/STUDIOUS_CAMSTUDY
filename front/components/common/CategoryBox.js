export default function CategoryBox({category}){

    return(
    <div class="flex justify-between  bg-red-300 rounded-[100px] mx-[300px] h-[50px] my-[50px]">
        <section class="flex items-center ml-[30px] font-bold">{category[0]}</section>
        <section class="flex items-center mr-[30px] font-bold">{category[1]}</section>                
    </div>
                    )
}