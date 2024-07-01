import { Btn } from "."


export const Lg = ({ load = true, callback=false, image="/images/not-found-habi.gif", title="sorry! no results found :(", text="change your filters and try again"}) => {
  if(load)
  return (
    <div className="col-span-full flex-grow flex-center">
        <div className="h-[320px] w-[320px] text-center">
            <img src={image} className="img-contain mx-auto" />
            <div className="font-bold text-lg text-neutral-600 -mt-5">{title}</div>
            <p className="text-neutral-400 text-sm">{text}</p>
            {callback && 
              <div className="w-[150px] mt-3 mx-auto">
                <Btn.Md onClick={callback}>reset filters</Btn.Md>
              </div>
            }
        </div>
    </div>
  )
}

export const Records = ({ load = true, callback=false, title="No Bookings Yet", text="change your search filters or reload the page and try again"}) => {
  if(load)
  return (
    <div className="col-span-full flex-grow flex-center">
        <div className="h-[320px] w-[320px] text-center">
            <img src="/images/not-found-habi.gif" className="img-contain mx-auto" />
            <div className="font-bold text-2xl text-neutral-600 -mt-16">{title}</div>
            <p className="text-neutral-400">{text}</p>
            {callback && 
              <div className="w-[150px] mt-3 mx-auto">
                <Btn.Md onClick={callback}>reset filters</Btn.Md>
              </div>
            }
        </div>
    </div>
  )
}




export const Sm = ({ load = true, query = "" }) => {

  if(load)
  return (
    <div className="p-3 text-center">
        <div className="h-[120px] w-[120px] mx-auto">
            <img src="/images/not_found-pedwuma.gif" alt="" className="img-contain" />
        </div>
        <div className="text-sm -mt-3 font-bold text-gray-500">No results for "{query.slice(0, 70)}"</div>
    </div>
  )
}
