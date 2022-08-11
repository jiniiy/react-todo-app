import React from 'react'

export default function Form({handleSubmit,value, setValue}) {

    //할일 입력
    const inputList = (e) => {
        setValue(e.target.value);
        console.log(e.target.value)
    };

    return (
        <form  onSubmit={handleSubmit} className="flex pt-2">
        <input 
          type="text" 
          name="value" 
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          placeholder= "해야 할 일을 입력하세요."
          value= {value}     //state관리할 부분
          onChange={inputList}
        />
        <input className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-red-400 hover:bg-blue-200"
          type="submit"
          value="입력"
        />
      </form> 
    )
}