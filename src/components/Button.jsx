


export const Lg = ({ children, normalIn = 'bg-neutral-900', normalOut = 'border-neutral-900', hoverIn = 'hover:bg-blue-800', hoverOut='hover:border-blue-700', ...props}) => {
  return (
    <button className={`my-3 w-full border-2 min-[550px]:cursor-pointer ${normalOut} ${hoverOut} rounded-xl shadow group transition-all duration-200`} {...props}>
        <div className={` ${normalIn} ${hoverIn} text-white rounded-xl p-3 relative -top-1.5 -left-2 group-active:top-0 group-active:left-0 transition-all duration-200`}>
            {children}
        </div>
    </button>
  )
}

export const Md = ({ children, normalIn = 'bg-neutral-900', normalOut = 'border-neutral-900', hoverIn = 'hover:bg-blue-800', hoverOut='hover:border-blue-700', ...props}) => {
    return (
        <button className={`w-full border min-[550px]:cursor-pointer ${normalOut} ${hoverOut} rounded-xl shadow group transition-all duration-200`} {...props}>
          <div className={`${normalIn} ${hoverIn} text-sm text-white rounded-xl p-4 py-2 relative -top-1 -left-1 group-active:top-0 group-active:left-0 transition-all duration-200`}>
              {children}
          </div>
        </button>
    )
  }