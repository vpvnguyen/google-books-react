import React from 'react'

export default function Body() {
    return (
        <>
            <div style={{ backgroundColor: 'lightgreen' }}> route1
            <p>Results section</p>
                <p>map and render from google books api</p>
                <p>view book</p>
                <p>save book</p>
                <p>title, subinfo, author, image, abstract</p>
            </div>
            <div style={{ backgroundColor: 'lightgrey' }}> route2
                <p>saved section</p>
                <p>map and render saved books from mongo</p>
                <p>view book</p>
                <p>delete book</p>
                <p>title, subinfo, author, image, abstract</p>
            </div>
        </>
    )
}
