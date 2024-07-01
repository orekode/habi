import { Leaf } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Table } from '../../components'



const Card = ({ icon = <Leaf  size={50}/>, name="Total Products", value="20"}) => {
  return (
    <>
      <div className='bg-green-600 bg-opacity-70 text-white rounded-2xl h-[85px] p-3 gap-1.5 flex justify-between'>
        <div className="flex flex-col justify-between" style={{width: 'calc(100% - 60px)'}}>
          <div className="name font-semibold text-sm">{name}</div>
          <div className="value font-medium text-4xl">{value.padStart(4, '0')}</div>
        </div>
        <div className=" w-[100px] items-center justify-end flex ">
          {icon}
        </div>
      </div>
    </>
  )
}

const Dashboard = () => {
  return (
    <div>
      <div className="top"></div>

      <div className="cards grid-box-220 gap-3">
        <Card name="Total Products"/>
        <Card name="Total Orders"/>
        <Card name="Total Diagnosis"/>
        <Card name="Total Users"/>
      </div>

      <Table 
        name="Recent Orders"
        actions={<button className='text-xs font-medium border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-xl p-1.5 text-green-600'>View All</button>}
        titles={{
          "Images":   1,
          "Products": 3,
          "Date":     3,
          "Quantity": 1,
          "Status":   2,
        }}
        values={[
          {
            image: 
            <>
              <div className="flex flex-wrap justify-center overflow-hidden max-h-[60px] w-full">
                {Array.from({length: 5}, (_, idx) => 
                  <div key={idx} className="image h-[30px] w-[30px] rounded-full overflow-hidden">
                    <img src="/images/tomatos.jpeg" className="object-cover hw-full" />
                  </div>
                )}
              </div>
            </>,
            products: "Tomatoes, Rice, Cooking Stuff, Checking Stuff, Other Stuff",
            date: '2st May 2025 5:00pm',
            quantity: '23 Items',
            status: 'Pending'
          }
        ]}
      />

    </div>
  )
}

export default Dashboard