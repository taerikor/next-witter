import React, { useCallback, useState } from 'react'

export default (initValue:string = "" ): any => {
    const [value, setValue ] = useState(initValue)
    const handler = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    },[])
    return [value,setValue,handler]
}