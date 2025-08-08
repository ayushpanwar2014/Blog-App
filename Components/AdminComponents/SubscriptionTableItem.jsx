import React from 'react'

const SubscriptionTableItem = ({email, date, removeEmail, id}) => {

  const emailDate = new Date(date);
  return (
    <tr className='bg-white border-b text-left '>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            {email? email : "No Email"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
        <td onClick={() => removeEmail(id)} className='px-10 py-4 cursor-pointer'>X</td>
    </tr>
  )
}

export default SubscriptionTableItem
