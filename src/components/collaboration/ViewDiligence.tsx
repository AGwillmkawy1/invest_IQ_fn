interface IViewDiligence{
    startupID:string
}

export default  function ViewDiligence({startupID}:IViewDiligence){
    return <div className='flex-1'>
            <h1>Insight</h1>
    </div>
}