
interface ProductMaterial {
    marca: string,
    material: string
}


const ProductMaterial = (props: ProductMaterial) => {
    
    const {marca,material} = props
    
    return (
                        <div className="flex items-center justify-between gap-3">
                    <p className="px-2 py-1 text-xs text-white bg-black rounded-2xl dark:bg-white dark:text-black w-fit">
                        {material}
                    </p>
                    <p className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-2xl w-fit">
                        {marca}
                    </p>
                </div> 
    )
}

export default ProductMaterial ;