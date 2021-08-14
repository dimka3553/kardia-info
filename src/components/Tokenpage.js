import React from 'react'

export default function Tokenpage({ match }) {
    return (
        <div>
            {match.params.id}
        </div>
    )
}
