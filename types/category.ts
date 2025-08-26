export type CategoryType = {
    id: number,
    attributes:
    {
        Nombre: string,
        slug: string,
        image: {
            data: {
                attributes: {
                    url: string,
                }
            }
        }
    }  
}