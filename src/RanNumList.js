const RanNumList = ({list}) => {
    return(
        <div className="space-x-2">
            {
                !list.length ? (
                    <h3 className="py-5">There's no register</h3>
                ) : (
                    list.map((num, i) => {
                        return(
                            <p class="inline-block py-5" key={i}>{num}</p>
                        )
                    }))
            }
        </div>
    )
}

export default RanNumList;