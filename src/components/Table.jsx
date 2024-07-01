import { useEffect, useState } from "react";

const Table = ({name, actions, titles={}, values=[]}) => {
    const [size, setSize] = useState(0)
    const [titleKeys, setTitleKeys] = useState([])
  
    useEffect(() => {
      let size = 0;
      Object.values(titles).map( item => size += item );
      setSize(size);
      setTitleKeys(Object.values(titles));
    }, []);
  
  
  
    return (
      <div className="table-box">
        <div className="top flex items-center justify-between py-3">
          <div className="name text-green-600">{name}</div>
          <div className="actions">
            {actions}
          </div>
        </div>
  
        <div className="titles flex justify-between gap-1 border rounded-2xl p-1.5 mb-3">
          {Object.keys(titles).map( item => 
            <div key={item} className={`text-center text-xs font-semibold border-r`} style={{width: `${(titles[item] / size) * 80}vw`}}>{item}</div>
          )}
        </div>
  
        <div className="values border rounded-2xl mt-3">
          {values.map( (item, i) => 
            <div key={i} className="value flex items-center justify-between gap-1 py-3 hover:bg-slate-200 rounded-2xl overflow-hidden">
              {Object.keys(item).map( (itm, idx) => 
                <div 
                  key={idx} 
                  className={`text-center overflow-clip text-sm border-r `} 
                  size={titles[titleKeys[idx]]} 
                  style={{width: `${(titleKeys[idx] / size) * 80}vw`}}
                >
                  {item[itm]}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }


  export default Table;