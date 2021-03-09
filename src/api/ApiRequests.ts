export const convertCurrency = (body: 
  { 
    to: string,
    from: string,
    amount: number
  }) => fetch('http://localhost:9000/converter', 
  { 
    method: 'post',
    body: JSON.stringify(body) ,
    headers: {
      'Content-Type': 'application/json' 
    }
  })
  .then(res => res.json());