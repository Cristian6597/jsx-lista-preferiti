import { Button } from "@/components/ui/button"
import React from "react"
import { Link } from "react-router"

function Preferiti() {
  return (
    <div className="container mx-auto">
      <div className="title flex flex-row justify-evenly">
      <Link to={`/`}>
          <Button className="text-3xl bg-white text-black hover:bg-white font-bold text-center my-8">Le Mie Card</Button>
        </Link>
        <Link to={`/preferiti`}>
        <Button className="text-3xl bg-white text-black hover:bg-white font-bold text-center my-8">Preferiti </Button>
        </Link>
      </div>
    </div>
  )
}

export default Preferiti
