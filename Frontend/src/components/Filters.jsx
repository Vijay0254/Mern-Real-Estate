import React from 'react'
import Input from './Input'

const Filters = ({ searchQuery, setsearchQuery, navigate }) => {

    function handleChange(event){
        const { name, value, checked, type } = event.target
        if(type == "checkbox"){
            setsearchQuery({ ...searchQuery, [name]: checked })
        }
        else{
            setsearchQuery({ ...searchQuery, sort: value.split("_")[0], order: value.split("_")[1] })
        }
    }

    function handleSearchQuery(){
        console.log(searchQuery)
        let urlParams = new URLSearchParams(window.location.search)
        for(let i in searchQuery){
            urlParams.set(i, searchQuery[i])
        }
        const query = urlParams.toString()
        navigate(`/search?${query}`)
    }

  return (
    <div className='p-8 py-10 font-medium shadow-lg sm:shadow-2xl h-full'>
        <h1 className='pb-7 font-bold text-2xl'>Filters:</h1>

        <div className='space-y-7'>
            <div className='flex items-center gap-x-4'>
                <h2>Type:</h2>
                <Input value={searchQuery.rent} onChange={(event) =>handleChange(event)} type={"checkbox"} placeholder={"Rent"} name={"rent"} id={"rent"} />
                <Input value={searchQuery.sell} onChange={(event) =>handleChange(event)} type={"checkbox"} placeholder={"Sell"} name={"sell"} id={"sell"} />
                <Input value={searchQuery.offer} onChange={(event) =>handleChange(event)} type={"checkbox"} placeholder={"Offer"} name={"offer"} id={"offer"} />
            </div>

            <div className='flex items-center gap-x-4'>
                <h2>Amenities:</h2>
                <Input value={searchQuery.parkingSpot} onChange={(event) =>handleChange(event)} type={"checkbox"} placeholder={"Parking"} name={"parkingSpot"} id={"parkingSpot"} />
                <Input value={searchQuery.furnished} onChange={(event) =>handleChange(event)} type={"checkbox"} placeholder={"Furnished"} name={"furnished"} id={"furnished"} />
            </div>
        
            <div className='flex items-center gap-x-4'>
                <h1>Sort:</h1>
                <select onChange={(event) =>handleChange(event)} className='px-3 pr-20 outline-none py-1' name="sort" id="sort">
                    <option value='price_desc'>Price high to low</option>
                    <option value='price_asc'>Price low to hight</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
                </select>
            </div>
        </div>

        <button onClick={() =>handleSearchQuery()} className='bg-slate-700 w-full mt-8 disabled:bg-slate-700/70 hover:bg-slate-700/80 duration-300 font-medium cursor-pointer flex justify-center items-center gap-x-2 text-white uppercase py-2 rounded-md'>Search</button>
    </div>
  )
}

export default Filters