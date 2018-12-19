import React from 'react'


const Message =({id,labels,read,selected,starred,subject,toggleStarred,toggleSelected}) =>{
  const readClasses = read ? "row message read" : "row message unread"
  const selectedClass = selected ? " selected" : ""
  const starredClasses = starred ? " star fa fa-star" : "star fa fa-star-o"

  const labelSpans = labels.map((label,i) =>{
    return <span key={i} className="label label-warning">{label}</span>
  })

  return(
    <div class={readClasses + selectedClass}>
    <div class="col-xs-1">
      <div class="row">
        <div class="col-xs-2">
          <input type="checkbox"  defaultChecked={selected} onClick={() => toggleSelected(id)} />
        </div>
        <div class="col-xs-2">
          <i class={starredClasses} onClick={()=>toggleStarred(id)}></i>
        </div>
      </div>
    </div>
    <div class="col-xs-11">
      {labelSpans}
      <a href="#">{subject}</a>
    </div>
  </div>
  )

}



export default Message
