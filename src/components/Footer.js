import React from 'react'

export default function Footer() {
    return (
        <footer style={{ color: "gray", position: "fixed", bottom: 0 }}>
            <center>Copyright @ {new Date().getFullYear()} Freddy-Tech</center>
        </footer>
    )
}
