import { useState } from 'react'
import './index.css'

function App() {

  const { isPending, error, data } = useQuery({
    queryKey: ['countries', filter, debouncedInput],
    queryFn: () => getCountries(filter, debouncedInput),
    enabled: true,
  });

  return (
    <>

    </>
  )
}

export default App
