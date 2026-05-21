import React from 'react'

function AdditionalReq({AdditionalReqInput}) {
    return (
        <div>
            <div className="label">
                <span className="label-text">
                    Enter Additional Requirement (Optional)
                </span>
            </div>
            <textarea className="textarea textarea-bordered h-24 w-full"
            onChange={(e)=> AdditionalReqInput(e.target.value)}>
                </textarea>
        </div>
    )
}

export default AdditionalReq