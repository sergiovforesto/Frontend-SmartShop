
async function GetProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/v1/products`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error('Something wrong')
    }
     
    return res.json()
}

async function GetProductId(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/v1/products/${id}`)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error('Something wrong')
    }
     
    return res.json()
}


export {
    GetProducts,
    GetProductId
}
