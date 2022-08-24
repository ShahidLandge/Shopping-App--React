import React from 'react'

function Alert(props) {
    console.log(props.alert)
  return (
    
     props.alert &&  <div className="alert alert-warning alert-dismissible fade show " role="alert">
  <strong>{props.alert.msg}</strong> 
</div>
    
  )
}

export default Alert
